export function mapStyles() {
    if (typeof window === 'undefined' || !window.IDEE) return {};

    return {

        stylepoint: new IDEE.style.Generic({
            point: {
                stroke: {
                    color: 'rgb(255, 81, 217)',
                    width: 3
                },
                fill: {
                    color: '#5182ff',
                    opacity: 0.4,
                },
                radius: 5
            }
        })

    };
}