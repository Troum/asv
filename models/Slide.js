
export default class Slide {
    constructor (title, description, link, src, background) {
        this.title = title
        this.description = description
        this.link = link
        this.src = src
        this.background = background
    }

    toJson () {
        return {...this}
    }
}
