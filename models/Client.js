export default class Client {
    constructor (url, logo) {
        this.url = url
        this.logo = logo
    }
    toJson () {
        return {...this}
    }
}
