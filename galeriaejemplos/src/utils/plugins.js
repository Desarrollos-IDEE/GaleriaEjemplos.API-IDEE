import { backgroundLayers } from './layers';

export function mapPlugins() {
    if (!window.IDEE) return {};

    const { tms_relieve, tms_global, tms_ignbaseSimplificado, WMTS_callejero, WMTS_PNOA, WMTS_IGNBaseOrto } = backgroundLayers();

    return {
        Layerswitcher: (customOpts = {}) => new IDEE.plugin.Layerswitcher({
            order: 2,
            collapsed: true,
            position: 'TR',
            tooltip: 'Capas shakemaps',
            collapsible: true,
            addLayers: false,
            isDraggable: false,
            modeSelectLayers: 'eyes',  //'eyes', 'radio'
            isMoveLayers: true,
            https: true,
            http: true,
            showCatalog: false,
            displayLabel: false,
            ...customOpts
        }),

        BackImgLayer: (customOpts = {}) => new IDEE.plugin.BackImgLayer({
            order: 1,
            position: 'TR',
            collapsible: true,
            collapsed: true,
            layerId: 1,
            columnsNumber: 3,
            layerVisibility: true,
            layerOpts: [{
                id: 'relieve',
                preview: '/galeriaejemplos/static/img/relieve.png', // ruta relativa, edite por la deseada
                title: 'Relieve',
                layers: [
                    tms_relieve,
                    tms_global,
                    tms_ignbaseSimplificado,
                ],
            },
            {
                id: 'Callejero',
                title: 'Callejero',
                preview: '/galeriaejemplos/static/img/callejero.png', // ruta relativa, edite por la deseada
                layers: [
                    WMTS_callejero
                ],
            },
            {
                id: 'hibrido',
                title: 'Híbrido',
                preview: '/galeriaejemplos/static/img/hibrido.png', // ruta relativa, edite por la deseada
                layers: [
                    WMTS_PNOA,
                    WMTS_IGNBaseOrto
                ],
            }
            ],
            ...customOpts
        }),

        MouseSRS: (customOpts = {}) => new IDEE.plugin.MouseSRS({
            srs: 'EPSG:4326',
            label: 'WGS84',
            precision: 6,
            geoDecimalDigits: 4,
            utmDecimalDigits: 2,
            ...customOpts
        }),

        OverviewMap: (customOpts = {}) => new IDEE.plugin.OverviewMap({
            position: 'BL',
            collapsible: true,
            collapsed: true,
            fixed: true,
            ...customOpts
        }),

        Locator: (customOpts = {}) =>new IDEE.plugin.Locator({
            position: 'TC',
            collapsible: false,
            collapsed: false,
            byParcelCadastre: false,
            byCoordinates: false,
            byPlaceAddressPostal: {
                noProcess: 'toponimo, ngbe, expendeduria  ',
            },
            ...customOpts
        }),

        Viewmanagement: (customOpts = {}) => new M.plugin.ViewManagement({
            postition: 'TL',
            collapsible: true,
            collapsed: true,
            resultVisibility: false,
            predefinedZoom: [{
                name: 'zoom 1',
                center: [-428106.86611520057, 4334472.25393817],
                zoom: 4,
            }],
            zoomExtent: true,
            viewhistory: false,
            zoompanel: true,
            isDraggable: false,
            ...customOpts
        }),

    }
}