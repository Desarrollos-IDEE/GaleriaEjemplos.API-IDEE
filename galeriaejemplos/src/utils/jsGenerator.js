import { pluginClassNames } from "./constants";

function objectToCode(value, indent = 0) {
    const spaces = ' '.repeat(indent);

    if (value === null) { return 'null';}
    if (value === undefined) { return 'undefined';}

    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
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

function generateMapCode(mapOptions) {
    const options = {
        container: 'map',
        ...mapOptions
    }
    return `const mapjs = IDEE.map(${objectToCode(options, 0)});`;
}

function generateLayerCode(layer, variableName) {
    const type = layer?._type;

    let parameters = {};
    if (layer?.constructorParameters?.parameters) parameters = layer.constructorParameters.parameters;
    else if (layer?.constructorParameters?.userParameters) parameters = layer.constructorParameters.userParameters;
    else if (layer?.constructorParameters?.userParams) parameters = layer.constructorParameters.userParams;

    return `const ${variableName} = new IDEE.layer.${type}(${objectToCode(parameters, 0)});`;
}


function generateStyleCode(style, variableName) {
    const options = style?.options_?.point ? style.options_ : {};
    return `const ${variableName} = new IDEE.style.Generic(${objectToCode(options, 0)});`;
}


function generatePluginCode(plugin, variableName) {

    const internalName = plugin?.name;
    const className = pluginClassNames[internalName];

    if (!className) return `// Plugin no soportado: ${internalName}`;
    const options = plugin?.options || {};
    if (Object.keys(options).length === 0) return `const ${variableName} = new IDEE.plugin.${className}();`;

    return `const ${variableName} = new IDEE.plugin.${className}(
${objectToCode(options, 0)}
);`;
}


// GENERAR TODO EL JS
export function generateJS(mapOptions, layers, plugins) {
    
    const lines = [];

    // 1. Crear mapa
    lines.push(
        '// 1. Crear mapa',
        generateMapCode(mapOptions),
        ''
    );

    // 2. Añadir capas
    if(layers) {
        lines.push(
            '',
            '// 2. Añadir capas'
        )
        layers.forEach((item, index) => {
            const layerName = `capa${index + 1}`;
            const styleName = `estilo${index + 1}`;
            lines.push(
                generateLayerCode( item.layer, layerName ),
                `mapjs.addLayers(${layerName});`,
                ''
            );
            if (item.style) {
                lines.push(
                    generateStyleCode( item.style, styleName ),
                    `${layerName}.setStyle(${styleName});`,
                    ''
                );
            }
    
        });
    }

    // 3. Añadir plugins
    if(plugins) {
        lines.push(
            '',
            '// 3. Añadir plugins'
        )
        plugins.forEach((plugin, index) => {
            const pluginName = `plugin${index + 1}`;
            lines.push(
                generatePluginCode( plugin, pluginName ),
                `mapjs.addPlugin(${pluginName});`,
                ''
            );
        });
    }

    return lines.join('\n');
}

