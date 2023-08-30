
export default defineNuxtPlugin(() => {

    return {
        provide: {
            dateTime: {
                formatDate: (datetime, locale = 'lt') => {
                    const date = new Date(datetime)
                    const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    }
                    const createdDate = new Intl.DateTimeFormat(locale, options).format(date)
                    return createdDate
                        .replace('г. в', '/')
                        .replace('at', '/')
                        .replace('d.', 'd. <br/>')
                }
            }
        }
    }
})
