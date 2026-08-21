import { mapStyles } from '@/utils/styles';
import { mapLayers, backgroundLayers } from '@/utils/layers';
import { mapPlugins } from '@/utils/plugins';

export async function getConfig() {
    const STYLES = await mapStyles();
    const LAYERS = await mapLayers();
    const BACKGROUNDLAYERS = await backgroundLayers();
    const PLUGINS = await mapPlugins();

    const locator = PLUGINS.Locator({
        position: 'TL',
        order: 0,
        useProxy: false,
        zoom: 16,
        pointStyle: 'pinAzul',
        byParcelCadastre: true,
        byCoordinates: true,
        byPlaceAddressPostal: {
            servicesToSearch: 'g',
            maxResults: 33,
            noProcess: 'expendeduria',
            reverse: false,
            searchPosition: 'geocoder',
        },
        isDraggable: false,
    });

    return {
        favicon: null,
        layers: [
            { layer: BACKGROUNDLAYERS.tms_ignbaseSimplificado },
            { layer: BACKGROUNDLAYERS.tms_relieve },
            { layer: BACKGROUNDLAYERS.tms_global },
            { layer: LAYERS.monitores, style: STYLES.stylepoint },
        ],
        plugins: [PLUGINS.Layerswitcher({ addLayers: true }), locator, PLUGINS.BackImgLayer(), PLUGINS.MouseSRS()],
    }
} 