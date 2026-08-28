export async function getConfig() {
    return {
        mapOptions: {
            controls: ['scale*true', 'scaleline', 'rotate', 'location', 'backgroundlayers'],
            zoom: 5,
            maxZoom: 20,
            minZoom: 4,
            center: [-467062.8225, 4983459.6216],
        }
    }
} 