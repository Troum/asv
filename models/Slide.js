
export default class Slide {
    constructor (title, description, link, src, background, textColor, buttonColor, buttonTextColor) {
        this.title = title
        this.description = description
        this.link = link
        this.src = src
        this.background = background
        this.textColor = textColor
        this.buttonColor = buttonColor
        this.buttonTextColor = buttonTextColor
    }

    toJson () {
        return {...this}
    }
}
