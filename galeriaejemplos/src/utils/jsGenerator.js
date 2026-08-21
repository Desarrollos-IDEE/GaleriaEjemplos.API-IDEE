function objectToCode(value, indent = 0) {
    const spaces = ' '.repeat(indent);

    if (value === null) { return 'null';}
    if (value === undefined) { return 'undefined';}

    if (typeof value === 'string') {
        return JSON.stringify(value);
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
    }

    if (Array.isArray(value)) {
        return `[${value.map(item => objectToCode(item, indent)).join(', ')}]`;
    }

    if (typeof value === 'object') {
        const entries = Object.entries(value);

        return `{
${entries
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => {
        return `${' '.repeat(indent + 4)}${key}: ${objectToCode(val, indent + 4)}`;
    })
    .join(',\n')}
${spaces}}`;
    }

    return String(value);
}


function generateLayerCode(layer, variableName) {

    const type = layer?._type;

    let parameters = {};

    if (layer?.constructorParameters?.parameters) {
        parameters = layer.constructorParameters.parameters;
    }

    if (layer?.constructorParameters?.userParameters) {
        parameters = layer.constructorParameters.userParameters;
    }

    return `const ${variableName} = new IDEE.layer.${type}(
${objectToCode(parameters, 0)}
);`;
}


function generateStyleCode(style, variableName) {

    const options = style?.options_?.point
        ? style.options_
        : {};

    return `const ${variableName} = new IDEE.style.Generic(
${objectToCode(options, 0)}
);`;
}



const pluginClassNames = {
    layerswitcher: 'Layerswitcher',
    locator: 'Locator',
    backimglayer: 'BackImgLayer',
    mousesrs: 'MouseSRS'
};


function generatePluginCode(plugin, variableName) {

    const internalName = plugin?.name_;

    const className =
        pluginClassNames[internalName];

    if (!className) {
        return `// Plugin no soportado: ${internalName}`;
    }

    const options = plugin?.options || {};

    const keys = Object.keys(options);

    if (keys.length === 0) {
        return `const ${variableName} = new IDEE.plugin.${className}();`;
    }

    return `const ${variableName} = new IDEE.plugin.${className}(
${objectToCode(options, 0)}
);`;
}


/**
 * GENERAR TODO EL JS
 */
export function generateJS(feature) {

    if (!feature) {
        return '';
    }

    const lines = [];

    lines.push(`const mapjs = IDEE.map({
    container: 'mapjs'
});`);

    lines.push('');


    // ========================
    // CAPAS
    // ========================

    feature.layers?.forEach((item, index) => {

        const layerName = `capa${index + 1}`;

        lines.push(
            generateLayerCode(
                item.layer,
                layerName
            )
        );

        lines.push('');

        if (item.style) {

            const styleName = `estilo${index + 1}`;

            lines.push(
                generateStyleCode(
                    item.style,
                    styleName
                )
            );

            lines.push('');

            lines.push(
                `${layerName}.setStyle(${styleName});`
            );

            lines.push('');
        }
    });


    // ========================
    // PLUGINS
    // ========================

    // feature.plugins?.forEach((plugin, index) => {

    //     const pluginName = `plugin${index + 1}`;

    //     lines.push(
    //         generatePluginCode(
    //             plugin,
    //             pluginName
    //         )
    //     );

    //     lines.push('');
    // });


    // ========================
    // AÑADIR CAPAS
    // ========================

    feature.layers?.forEach((item, index) => {

        lines.push(
            `mapjs.addLayers(capa${index + 1});`
        );
    });

    lines.push('');


    // ========================
    // AÑADIR PLUGINS
    // ========================

    // feature.plugins?.forEach((plugin, index) => {

    //     lines.push(
    //         `mapjs.addPlugin(plugin${index + 1});`
    //     );
    // });


    return lines.join('\n');
}

