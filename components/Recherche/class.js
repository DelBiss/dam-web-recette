//@ts-check
import Component from "../cComponent/Component.js";

export default class Recherche extends Component {
    constructor(props) {
        super(props, "data-recherche");

    }

    async load() {
        await super.load()
        if (this.searchCallback != null) {

            let btn = this.element.querySelector("[data-recherche-button]")
            btn.addEventListener("click", this.searchCallback)
        }
        return true
    }

    get searchTerm() {
        let searchBar = this.element.querySelector("[data-recherche-input]")
        return searchBar.value
    }

    setSearchCallback(callback) {
        this.searchCallback = callback
        this.searchCallback.context.target = this

    }
}