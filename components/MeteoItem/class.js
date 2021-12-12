//@ts-check
import { ph_MeteoItem } from "../../data/placeholder.js";
import Component from "../cComponent/Component.js";

export default class MeteoItem extends Component {

    /**
     * @param {any} props
     */
    constructor(props) {
        super(props, "data-meteo-item");
        this.props = props ? props : ph_MeteoItem[0];

    }

    /**
     * @param {HTMLElement} [elementWhere]
     */
    async render(elementWhere) {
        let e = await super.render(elementWhere)
        return e
    }
}