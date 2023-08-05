import moment from "moment";

export default class Publication {
    constructor (id, title, subtitle, article, image, slug, createdAt) {
        moment.locale('ru')
        this.id = id
        this.title = title
        this.subtitle = subtitle
        this.article = article
        this.image = image
        this.slug = slug
        this.createdAt = moment(createdAt).format('DD.MM.YYYY - H:m')
    }
    toJson () {
        return {...this}
    }
}
