export function createIframeDocument(htmlCode, cssCode, jsCode) {

    const parser = new DOMParser();
    const document = parser.parseFromString(htmlCode, "text/html");
    const style = document.createElement("style");

    style.textContent = cssCode;
    document.head.appendChild(style);

    const errorScript = document.createElement("script");

    errorScript.textContent = `

(function () {

    function sendError(error) {
        let message = (error instanceof Error) ? (error.stack || error.message) : String(error);
        window.parent.postMessage({ type: "MAP_ERROR", error: message }, "*");
    }

    window.__reportMapError = sendError;

    // ERRORES JAVASCRIPT
    window.addEventListener( "error", function (event) {
        const error = event.error || event.message;
        const location = event.filename
            ? "\\nEn " + event.filename + ":" + event.lineno + ":" + event.colno
            : "";

        sendError( error instanceof Error ? error : String(error) + location );
    });

    // PROMESAS NO CONTROLADAS
    window.addEventListener( "unhandledrejection", function (event) {
        sendError( event.reason );
    });

    // ERRORES AL CARGAR RECURSOS
    window.addEventListener( "error", function (event) {
        const target = event.target;
        if ( target && (target.tagName === "SCRIPT" || target.tagName === "LINK") ) {
            sendError( "No se ha podido cargar: " + (target.src || target.href) );
        }
    }, true );

})();

`;

    document.head.appendChild( errorScript );

    // JAVASCRIPT DEL USUARIO
    const script = document.createElement("script");
    script.textContent = `
try {
${jsCode}
} catch (error) {
    window.__reportMapError(error);
}
`;
    document.body.appendChild( script );

    return ( "<!DOCTYPE html>" + document.documentElement.outerHTML );

}