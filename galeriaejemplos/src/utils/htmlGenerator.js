//////////// PLANTILLA DE PRUEBA
export function generateHTML() {

    return `<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    >

    <meta
        http-equiv="X-UA-Compatible"
        content="IE=edge"
    >

    <meta name="cnig" content="yes">

    <title>Ejemplo API-IDEE</title>

    <!-- Estilo de la API -->
    <link
        type="text/css"
        rel="stylesheet"
        href="https://componentes.idee.es/api-idee/assets/css/apiidee.ol.min.css"
    >

    <!-- Dependencias de la API -->
    <script
        src="https://componentes.idee.es/api-idee/vendor/browser-polyfill.js">
    </script>

    <script
        src="https://componentes.idee.es/api-idee/js/apiidee.ol.min.js">
    </script>

    <script
        src="https://componentes.idee.es/api-idee/js/configuration.js">
    </script>

</head>

<body>

    <div
        id="mapjs"
        class="m-container">
    </div>

</body>

</html>`;
}