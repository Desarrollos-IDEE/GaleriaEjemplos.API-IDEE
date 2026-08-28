import { IGNLayers } from '@/utils/layers';
import { mapPlugins } from '@/utils/plugins';

export async function getConfig() {
    const PLUGINS = await mapPlugins();
    const LAYERS = await IGNLayers();

    return {
        mapOptions: {
            controls: ['scale*true', 'scaleline', 'rotate', 'location', 'backgroundlayers'],
            zoom: 5,
            maxZoom: 20,
            minZoom: 4,
            center: [-467062.8225, 4983459.6216],
        },
        layers: [
            { layer: LAYERS.landuse },
            { layer: LAYERS.provincias },
            { layer: LAYERS.ua },
            { layer: LAYERS.delegaciones },
        ],
        plugins: [PLUGINS.Locator({ position: 'TC' }), PLUGINS.Viewmanagement({position: 'TL'}), PLUGINS.Layerswitcher({position: 'TL'}), PLUGINS.ShareMap(), PLUGINS.MouseSRS()],
    }
} 