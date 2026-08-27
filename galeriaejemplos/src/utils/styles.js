export function styles() {
    if (typeof window === 'undefined' || !window.IDEE) return {};

    return {

        point: new IDEE.style.Generic({
            point: {
                radius: 2, 
                fill: {  
                    color: 'black',
                    opacity: 0.5
                }
            }
        })

    };
}