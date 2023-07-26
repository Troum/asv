export default defineNuxtPlugin(() => {

    return {
        provide: {
            display: {
                socialBar: (display, width) => {
                    return (width * display) / 1920
                },
                navBar: (display, height) => {
                    return (height * display) / 1080
                },
                footer: (display, socialBar) => {
                    return display - socialBar
                },
                logo: (display, width) => {
                    return (width * display) / 1920
                },
                height: (display, height) => {
                    return (height * display) / 1080
                },
                width: (display, width) => {
                    return (width * display) / 1920
                },
                fontSize: (display, height) => {
                    return `font-size: ${(height * display) / 1080}px`
                },
                slideContentWidth: (display, width) => {
                    return (width * display) / (1920 - 150)
                }
            }
        }
    }
})
