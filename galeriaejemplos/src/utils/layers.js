export function backgroundLayers() {
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


export async function IGNLayers() {
    return {
        direcciones: new IDEE.layer.WFS({
            url: "https://www.cartociudad.es/wfs-inspire/direcciones?",
            name: "ad:Address",
            name: "direcciones",
            legend: "Direcciones cartociudad",
        }),
        
        ngbe: new IDEE.layer.WFS({
            url: "https://www.ign.es/wfs-inspire/ngbe?",
            name: "gn:NamedPlace",
            legend: "Nomenclator Geográfico Básico de España",
        }),

        rednap: new IDEE.layer.WFS({
            url: "https://www.ign.es/wfs/redes-geodesicas?",
            name: "RED_NAP",
            legend: "Red de Nivelación de Alta Precisión (REDNAP)",
        }),
        
        regente: new IDEE.layer.WFS({
            url: "https://www.ign.es/wfs/redes-geodesicas?",
            name: "RED_REGENTE",
            legend: "Red REGENTE",
        }),
        
        roi: new IDEE.layer.WFS({
            url: "https://www.ign.es/wfs/redes-geodesicas?",
            name: "RED_ROI",
            legend: "Red de Orden Inferior (ROI)",
        }),
        
        mareografos: new IDEE.layer.WFS({
            url: "https://www.ign.es/wfs/redes-geodesicas?",
            name: "RED_MAREOGRAFOS",
            legend: "Red de Mareógrafos",
        }),
        
        provincias: new IDEE.layer.WMS({
            url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
            name: 'AU.AdministrativeBoundary',
            legend: 'Limite administrativo',
            tiled: false,
        }),

        ua: new IDEE.layer.WMS({
            url: 'https://www.ign.es/wms-inspire/unidades-administrativas?',
            name: 'AU.AdministrativeUnit',
            legend: 'Unidad administrativa',
            tiled: false
        }),

        landuse: new IDEE.layer.WMTS({
            url: 'https://wmts-mapa-lidar.idee.es/lidar',
            name: 'EL.GridCoverageDSM',
            legend: 'Modelo Digital de Superficies LiDAR',
            matrixSet: 'GoogleMapsCompatible',
            visibility: true,
        }),

        delegaciones: new IDEE.layer.KML({
            url: 'https://www.ign.es/web/resources/delegaciones/DelegacionesIGN-APICNIG.kml',
            name:  'delegacionesIGN',
            extract: false,
            legend: 'Delegaciones IGN',
            transparent: true,
        })


    }
}


