
export default class Slide {
    constructor (title, description, link, src, background, textColor) {
        this.title = title
        this.description = description
        this.link = link
        this.src = src
        this.background = background
        this.textColor = textColor
    }

    toJson () {
        return {...this}
    }
}
