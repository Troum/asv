export default class Service {
    constructor (id, logo, name, slug, description, whiteLogo) {
        this.id = id
        this.logo = logo
        this.name = name
        this.slug = slug
        this.description = description
        this.whiteLogo = whiteLogo
    }
    toJson () {
        return {...this}
    }
}
