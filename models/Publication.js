import moment from "moment";

export default class Publication {
    constructor (title, article, image, slug, createdAt) {
        moment.locale('ru')
        this.image = image
        this.title = title
        this.article = article
        this.image = image
        this.slug = slug
        this.createdAt = moment(createdAt).format('L H:m')
    }
    toJson () {
        return {...this}
    }
}
