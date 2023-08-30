export default class Publication {
    constructor(id, title, subtitle, article, image, slug, createdAt) {
        this.id = id
        this.title = title
        this.subtitle = subtitle
        this.article = article
        this.image = image
        this.slug = slug
        this.createdAt = createdAt
    }

    toJson() {
        return {...this}
    }
}
