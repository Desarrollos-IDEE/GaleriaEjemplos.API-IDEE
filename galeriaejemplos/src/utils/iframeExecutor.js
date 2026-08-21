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

        let message;

        if (error instanceof Error) {

            message =
                error.stack ||
                error.message;

        }
        else {

            message =
                String(error);

        }


        window.parent.postMessage({

            type: "MAP_ERROR",

            error: message

        }, "*");

    }


    // ==========================================
    // ERRORES JAVASCRIPT
    // ==========================================

    window.addEventListener(
        "error",
        function (event) {

            sendError(
                event.error ||
                event.message
            );

        }
    );


    // ==========================================
    // PROMESAS NO CONTROLADAS
    // ==========================================

    window.addEventListener(
        "unhandledrejection",
        function (event) {

            sendError(
                event.reason
            );

        }
    );


    // ==========================================
    // ERRORES AL CARGAR RECURSOS
    // ==========================================

    window.addEventListener(
        "error",
        function (event) {

            const target =
                event.target;


            if (
                target &&
                target.tagName === "SCRIPT"
            ) {

                sendError(
                    "No se ha podido cargar: " +
                    target.src
                );

            }

        },
        true
    );

})();

`;

    document.head.appendChild(
        errorScript
    );


    // JAVASCRIPT DEL USUARIO
    const script = document.createElement("script");

    script.textContent = jsCode;

    document.body.appendChild(
        script
    );


    return (
        "<!DOCTYPE html>" +
        document.documentElement.outerHTML
    );

}