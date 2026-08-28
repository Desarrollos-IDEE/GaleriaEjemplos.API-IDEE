import { pluginClassNames } from "./constants";

function getLayerParameters(layer) {
    if (layer?.constructorParameters?.parameters) return layer.constructorParameters.parameters;
    if (layer?.constructorParameters?.userParameters) return layer.constructorParameters.userParameters;
    if (layer?.constructorParameters?.userParams) return layer.constructorParameters.userParams;
    return {};
}

function objectToCode(value, indent = 0, ancestors = new WeakSet()) {
    const spaces = ' '.repeat(indent);

    if (value === null) { return 'null';}
    if (value === undefined) { return 'undefined';}

    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) {
        if (ancestors.has(value)) return 'undefined';

        ancestors.add(value);
        const result = `[${value.map(item => objectToCode(item, indent, ancestors)).join(', ')}]`;
        ancestors.delete(value);
        return result;
    }

    if (typeof value === 'object') {
        if (value?._type && value?.constructorParameters) {
            const parameters = getLayerParameters(value);
            return `new IDEE.layer.${value._type}(${objectToCode(parameters, indent, ancestors)})`;
        }

        if (ancestors.has(value)) return 'undefined';

        ancestors.add(value);
        const entries = Object.entries(value);

        const result = `{
${entries
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => {
        return `${' '.repeat(indent + 4)}${key}: ${objectToCode(val, indent + 4, ancestors)}`;
    })
    .join(',\n')}
${spaces}}`;
        ancestors.delete(value);
        return result;
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

    const parameters = getLayerParameters(layer);

    return `const ${variableName} = new IDEE.layer.${type}(${objectToCode(parameters, 0)});`;
}


function generateStyleCode(style, variableName) {
    const options = style?.options_?.point ? style.options_ : {};
    return `const ${variableName} = new IDEE.style.Generic(${objectToCode(options, 0)});`;
}


function generatePluginCode(plugin, variableName) {
    const internalName = plugin?.name;
    const className = pluginClassNames[internalName];

    const options = plugin?.options || {};
    if (Object.keys(options).length === 0) return `const ${variableName} = new IDEE.plugin.${className}();`;

    return `const ${variableName} = new IDEE.plugin.${className}(${objectToCode(options, 0)});`;
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
            const internalName = plugin?.name;
            const className = pluginClassNames[internalName];
            if(className) {
                lines.push(
                    generatePluginCode( plugin, pluginName ),
                    `mapjs.addPlugin(${pluginName});`,
                    ''
                );
            } else {
                lines.push(
                    `// ¡Atención! plugin no soportado: ${internalName}`,
                    ''
                )
            }
        });
    }

    return lines.join('\n');
}

