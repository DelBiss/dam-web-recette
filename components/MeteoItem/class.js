//@ts-check
import { createElementWithCSS } from "../../script/utils.js";
import { ph_MeteoItem } from "../../data/placeholder.js";
import Component from "../cComponent/Component.js";

export default class MeteoItem extends Component {

    /**
     * @param {any} props
     */
    constructor(props) {
        super(props, "meteoItem");
        this.props = props ? props : ph_MeteoItem[0];

    }

    async render() {

        return await (await this.getElement()).body.firstElementChild;

    }

    /**
     * Render the Location section
     * @param {string} parentCss
     * @returns {Node}
     */
    renderLocation(parentCss) {
        const myCss = parentCss + "-location";
        let eLocation = createElementWithCSS("section", myCss);

        let eLocationName = createElementWithCSS("p", myCss + "-name");
        eLocationName.textContent = this.props.location.name;

        eLocation.appendChild(eLocationName);
        return eLocation;
    }

    /**
     * @param {string} parentCss
     * @returns {Node}
     */
    renderCurrent(parentCss) {
        const myCss = parentCss + "-current";
        let eCurrent = createElementWithCSS("section", myCss);

        var eIcon = eCurrent.appendChild(createElementWithCSS("img", myCss + "-img"));
        eIcon.src = "https:" + this.props.current.condition.icon;
        eIcon.alt = this.props.current.condition.text;
        eIcon.title = this.props.current.condition.text;

        eCurrent.appendChild(this.renderTemperature(myCss));
        return eCurrent;
    }

    /**
     * Render the Temperature section
     * @param {string} parentCss
     * @returns {Node}
     */
    renderTemperature(parentCss) {
        const myCss = parentCss + "-temps";
        let eSection = createElementWithCSS("section", myCss);

        let eTemperature = eSection.appendChild(createElementWithCSS("p", myCss + "-temperature"));
        eTemperature.textContent = this.props.current.temp_c;

        return eSection;
    }
}