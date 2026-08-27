import { backgroundLayers, IGNLayers } from '@/utils/layers';
import { styles } from '@/utils/styles';
import { mapPlugins } from '@/utils/plugins';

export async function getConfig() {
    const BACKGROUNDLAYERS = await backgroundLayers();
    const PLUGINS = await mapPlugins();
    const STYLES = await styles();
    const LAYERS = await IGNLayers();

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
        mapOptions: {
            controls: ['location'],// Modificar a gusto la siguiente lista con los valores arriba indicados
            zoom: 5,
            maxZoom: 20,
            minZoom: 4,
            center: [-467062.8225, 4683459.6216]
        },
        layers: [
            { layer: BACKGROUNDLAYERS.tms_ignbaseSimplificado },
            { layer: BACKGROUNDLAYERS.tms_relieve },
            { layer: BACKGROUNDLAYERS.tms_global },
            { layer: LAYERS.regente, style: STYLES.point },
        ],
        plugins: [PLUGINS.Layerswitcher({ addLayers: true }), locator, /*PLUGINS.BackImgLayer(),*/ PLUGINS.MouseSRS()],
    }
} 