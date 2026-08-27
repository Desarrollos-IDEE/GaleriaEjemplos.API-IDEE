// PLANTILLA DE PRUEBA
export function generateHTML(favicon, plugins) {
    // Añadimos las dependencias de los plugins al vuelo, dependiendo de los plugins que se incluyan en el ejemplo.
    // PÁGINA PRINCIPAL (head.jsx) --> Para crear los plugins que se van a utilizar
    // PLANTILLA DE PRUEBA (htmlGenerator.js) --> Para añadir los plugins al mapa dentro del iframe 
    // (La plantilla es una página independiente, embebida en la página principal)
    return `<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="cnig" content="yes">
    ${favicon ? `<link href=${favicon} rel="icon">` : ''}

    <title>Ejemplo API-IDEE</title>

    <!-- Estilo de la API -->
    <link type="text/css" rel="stylesheet" href="https://componentes.idee.es/api-idee/assets/css/apiidee.ol.min.css">
    
    <!-- Dependencias de la API -->
    <script src="https://componentes.idee.es/api-idee/vendor/browser-polyfill.js"></script>
    <script src="https://componentes.idee.es/api-idee/js/apiidee.ol.min.js"></script>
    <script src="https://componentes.idee.es/api-idee/js/configuration.js"></script>
    
    ${plugins?.map(plugin => {
        const name = plugin.name || plugin.name_;
        if (!name) return '';

        return `<!-- Plugin ${name} -->
    <link rel="stylesheet" href="https://componentes.idee.es/api-idee/plugins/${name}/${name}.ol.min.css">
    <script src="https://componentes.idee.es/api-idee/plugins/${name}/${name}.ol.min.js"></script>\n`;
    }).join('\n\t') || ''}
</head>

<body>
    <!-- Contenedor dentro del cual se inserta el mapa (ver pestaña JS) -->
    <div id="map" class="map-container"></div>
</body>

</html>`;
}