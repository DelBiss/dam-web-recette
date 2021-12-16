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
        this.city = 0;
        this.api = {
            url: "https://api.weatherapi.com/v1/current.json?key=f111c71466e14bca870155327210212%20&aqi=no&lang=fr&q=",
            default: "Montreal"
        }
        this.api.eventQ = ["Montreal", "Laval", "Quebec", "Toronto", "London"]
    }

    async load() {
        await this.fetchData()
        await super.load()
        return true
    }

    /**
     * @param {HTMLElement} [elementWhere]
     */
    async render(elementWhere) {
        let e = await super.render(elementWhere)
        return e
    }

    async fetchData(q) {
        q = q || this.api.default;
        let response = await fetch(this.api.url + q);
        this.props = await response.json();

    }

    async rotateData() {
        this.city = ++this.city < this.api.eventQ.length ? this.city : 0;
        console.log(this.city)
        await this.fetchData(this.api.eventQ[this.city])
        this.refresh()
    }

    event_RotateData() {
        return function() {
            this.rotateData()
        }.bind(this)
    }
}