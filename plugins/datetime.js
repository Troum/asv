
export default defineNuxtPlugin(() => {

    return {
        provide: {
            dateTime: {
                formatDate: (datetime) => {
                    const date = new Date(datetime)
                    const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    }
                    const createdDate = new Intl.DateTimeFormat('ru', options).format(date)
                    return createdDate.replace('г. в', '/')
                }
            }
        }
    }
})
