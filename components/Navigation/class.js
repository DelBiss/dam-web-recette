//@ts-check
import Component from "../cComponent/Component.js";

export default class Navigation extends Component {
    constructor(props) {
        super(props, "data-nav");
        this.categoriesCallback = []
        this.props = { categories: [] }
    }

    setCategories(categoriesCallback) {
        this.categoriesCallback = categoriesCallback;
    }

    fillElement(tagName = null, data = null) {
        this.props.categories = []
        for (const catCall of this.categoriesCallback) {
            this.props.categories.push(catCall.data.label)
        }
        super.fillElement(tagName, data)
        let cat = this.element.querySelectorAll("[class='nav-list-item']")
        for (let index = 0; index < cat.length; index++) {
            const element = cat[index];
            element.addEventListener("click", this.categoriesCallback[index])
        }

        return this.element
    }

}