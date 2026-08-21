export function backgroundLayers() {
    if (typeof window === 'undefined' || !window.IDEE) return {};
    return {
        tms_relieve: new IDEE.layer.TMS({
            url: 'https://tms-relieve.idee.es/1.0.0/relieve/{z}/{x}/{-y}.jpeg',
            name: 'TMS geofísica',
            projection: 'EPSG:3857',
            minZoom: 1,
            maxZoom: 15,
            tileGridMaxZoom: 14,
            displayInLayerSwitcher: false,
            visibility: true,
            isBase: true,
        }),

        tms_ignbaseSimplificado: new IDEE.layer.TMS({
            url: 'https://tms-ign-base.idee.es/1.0.0/IGNBaseSimplificado/{z}/{x}/{-y}.png',
            name: 'Información adicional',
            projection: 'EPSG:3857',
            minZoom: 1,
            maxZoom: 15,
            displayInLayerSwitcher: false,
            visibility: true,
            isBase: true,
        }),

        tms_global: new IDEE.layer.TMS({
            url: 'https://tms-global.ign.es/1.0.0/global/{z}/{x}/{-y}.png',
            name: 'global',
            projection: 'EPSG:3857',
            minZoom: 1,
            maxZoom: 15,
            displayInLayerSwitcher: false,
            visibility: true,
            isBase: true,

        }),

        tms_callejero_gris: new IDEE.layer.TMS({
            url: 'https://tms-ign-base.idee.es/1.0.0/IGNBaseGris/{z}/{x}/{-y}.jpeg',
            name: 'tms_callejero_gris',
            projection: 'EPSG:3857',
            minZoom: 1,
            maxZoom: 15,
            displayInLayerSwitcher: false,
            visibility: true,
            isBase: true,

        }),


        WMTS_callejero: new IDEE.layer.WMTS({
            url: "https://www.ign.es/wmts/ign-base",
            name: "IGNBaseTodo",
            matrixSet: "GoogleMapsCompatible",
            legend: "IGNBase_Todo",
            isBase: true,
        }, { displayInLayerSwitcher: false }),

        WMTS_IGNBaseOrto: new IDEE.layer.WMTS({
            url: 'https://www.ign.es/wmts/ign-base?',
            name: 'IGNBaseOrto',
            matrixSet: 'GoogleMapsCompatible',
            legend: 'Mapa IGN',
            isBase: false,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/png',
        }, { displayInLayerSwitcher: false }),

        WMTS_PNOA: new IDEE.layer.WMTS({
            url: 'https://www.ign.es/wmts/pnoa-ma?',
            name: 'OI.OrthoimageCoverage',
            legend: 'Imagen (PNOA)',
            matrixSet: 'GoogleMapsCompatible',
            isBase: true,
            displayInLayerSwitcher: false,
            queryable: false,
            visible: true,
            format: 'image/png',
        }, { displayInLayerSwitcher: false }),
    }

}


export async function mapLayers() {
    if (typeof window === 'undefined' || !window.IDEE) return {};

    const layers = {

        monitores: new IDEE.layer.GeoJSON({
            name: "Monitorización tiempo real",
            url: 'https://www.ign.es/resources/sismologia/intensidades-lorca/data/lorca.geojson',
            extract: false,
        }),

        WMTS_mapaLidar: new IDEE.layer.WMTS({
            url: "https://wmts-mapa-lidar.idee.es/lidar",
            name: "EL.GridCoverageDSM",
            matrixSet: "GoogleMapsCompatible",
            legend: "Mapa_Lidar",
        }, { displayInLayerSwitcher: false }),

        tms_ignbaseorto2: new IDEE.layer.TMS({
            url: 'https://tms-ign-base.idee.es/1.0.0/IGNBaseOrto/{z}/{x}/{-y}.png',
            name: 'Información adicional',
            projection: 'EPSG:3857',
            minZoom: 1,
            maxZoom: 15,
            displayInLayerSwitcher: false,
            visibility: true,
            isBase: false,
        }),

        // Capas del visualizador Lorca/shakemaps
        lineas_intensidad: new IDEE.layer.GeoJSON({
            name: "Intensidad",
            url: 'https://www.ign.es/resources/sismologia/shakemaps_lorca/data/cont_mi.json',
            extract: false,
            legend: 'Intensidad',
        }),

        lyrPGA: new IDEE.layer.GeoJSON({
            name: "PGA",
            url: 'https://www.ign.es/resources/sismologia/shakemaps_lorca/data/cont_pga.json',
            extract: false,
            legend: 'PGA',
        }, { visibility: false }),

        lyrPGV: new IDEE.layer.GeoJSON({
            name: "PGV",
            url: 'https://www.ign.es/resources/sismologia/shakemaps_lorca/data/cont_pgv.json',
            extract: false,
            legend: 'PGV',
        }, { visibility: false }),

        lyrStations: new IDEE.layer.GeoJSON({
            name: "Estaciones",
            url: 'https://www.ign.es/resources/sismologia/shakemaps_lorca/data/stationlist.json',
            extract: false,
            legend: 'Estaciones',
        }),

        lyrLorca: new IDEE.layer.GeoJSON({
            name: "Lorca",
            source: {
                "type": "FeatureCollection",
                "features": [{
                    "properties": {
                        "epicentro": "Lorca"
                    },
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-1.7114, 37.7175]
                    }
                }],
                "crs": {
                    "properties": {
                        "name": "EPSG:4326"
                    },
                    "type": "name"
                }
            }
        }, {
            visible: true,
            displayInLayerSwitcher: false
        }),

        lyrIntensidades: new IDEE.layer.GeoJSON({
            name: "Monitorización día del terremoto",
            url: 'https://www.ign.es/web/resources/sismologia/intensidades-lorca/data/intensidades.geojson',
            extract: true,
        }),
     

        vector: new IDEE.layer.Vector({
            name: 'vectores',
        }, {
            displayInLayerSwitcher: false,
        }),

    }

    return layers
}
