export default class Service {
    constructor (logo) {
        this.logo = logo
    }
    toJson () {
        return {...this}
    }
}
