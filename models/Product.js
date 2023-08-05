export default class Product {
    constructor (id, avatar, title, subtitle, description, logo, slug, type, video,company, proclamation, characteristic) {
        this.id = id
        this.avatar = avatar
        this.title = title
        this.subtitle = subtitle
        this.description = description
        this.logo = logo
        this.slug = slug
        this.type = type
        this.video = video
        this.company = company
        this.proclamation = proclamation
        this.characteristic = characteristic
    }
    toJson () {
        return {...this}
    }
}
