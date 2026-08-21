import Script from 'next/script';

export default function CustomHead() {
    return (
        <>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
            />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="theme-color" content="#000000" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta httpEquiv="expires" content="no-cache" />
            <meta httpEquiv="pragma" content="no-cache" />
            <meta name="author" content="Centro Nacional de Información Geográfica" />
            <meta name="title" content={process.env.PAGE_TITLE} />
            <meta
                name="description"
                content="Proyecto colaborativo de la Infraestructura de Datos Espaciales de España (IDEE) para la visualización de información geográfica y servicios web del Centro Nacional de Información Geográfica (CNIG) del Instituto Geográfico Nacional (IGN)."
            />
            <meta
                name="keywords"
                content="Visualizadores, API-IDEE, Infraestructura de Datos Espaciales de España, Infraestructura de Información Geográfica,información geográfica, servicios web, servicios interoperables, mapas, cartografía, ortofotos, WMS, WFS, Servicios de Visualización, Servicios de Localización"
            />
            <meta name="rating" content="General" />
            <meta name="robots" content="FOLLOW,INDEX" />
            <meta name="revisit-after" content="1 weeks" />

            <title>{process.env.PAGE_TITLE}</title>

            {/* Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" />

            {/* CSS Assets */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_URL}/assets/css/apiidee.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/layerswitcher/layerswitcher.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/backimglayer/backimglayer.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/mousesrs/mousesrs.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/locator/locator.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/viewmanagement/viewmanagement.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/contactlink/contactlink.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/filteredsearch/filteredsearch.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/help/help.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/incicarto/incicarto.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/infocoordinates/infocoordinates.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/information/information.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/locatorscn/locatorscn.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/magnify/magnify.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/mapheader/mapheader.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/mapfooter/mapfooter.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/measurebar/measurebar.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/modal/modal.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/printviewmanagement/printviewmanagement-1.0.0.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/selectionzoom/selectionzoom.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/sharemap/sharemap.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/storymap/storymap.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/stylemanager/stylemanager.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/timeline/timeline.ol.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/vectorsmanagement/vectorsmanagement.ol.min.css`} />

            {/* JS Assets */}
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_URL}/js/apiidee.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_URL}/js/configuration.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/layerswitcher/layerswitcher.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/backimglayer/backimglayer.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/mousesrs/mousesrs.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/locator/locator.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/locatorscn/locatorscn.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/viewmanagement/viewmanagement.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/contactlink/contactlink.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/filteredsearch/filteredsearch.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/help/help.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/incicarto/incicarto.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/infocoordinates/infocoordinates.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/information/information.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/magnify/magnify.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/mapheader/mapheader.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/mapfooter/mapfooter.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/measurebar/measurebar.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/modal/modal.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/printviewmanagement/printviewmanagement-1.0.0.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/selectionzoom/selectionzoom.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/sharemap/sharemap.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/storymap/storymap.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/stylemanager/stylemanager.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/timeline/timeline.ol.min.js`} strategy="beforeInteractive"></Script>
            <Script src={`${process.env.NEXT_PUBLIC_API_IDEE_PLUGINS_URL}/plugins/vectorsmanagement/vectorsmanagement.ol.min.js`} strategy="beforeInteractive"></Script>

            <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-VT4958DGW9`} strategy="beforeInteractive"></Script>
            <Script id='google_analytics'
                dangerouslySetInnerHTML={{
                    __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments)};
                  gtag('js', new Date());
                  gtag('config', 'G-VT4958DGW9');
                `,
                }}
            />
        </>
    )
}