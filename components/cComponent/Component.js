//@ts-check
export default class Component {

    /**
     * @param {any} props
     */
    constructor(props) {
        this.props = props;
        this._htmlElement = null;
        this._html = null;


        this._url = new URL("../" + this.constructor.name,
            // @ts-ignore
            import.meta.url);
    }

    async getHtml() {
        if (this._html == null) {
            try {
                console.log(this._url.href + "/index.html")
                let response = await fetch(this._url.href + "/index.html");
                if (!response.ok) {
                    throw new Error(`HTTP error load component html! status: ${response.status}`);
                } else {
                    this._html = await response.text();
                }
            } catch (error) {
                console.log(error);
            }
        }
        return this._html;
    }

    async getElement(s) {
        // console.log(s)
        // console.log(
        // import.meta)
        if (this._htmlElement == null) {
            let parser = new DOMParser();
            this._htmlElement = parser.parseFromString(await this.getHtml(), "text/html")
            let css = this._htmlElement.head.querySelector('[rel="stylesheet"');
            css.attributes.getNamedItem("href").value = this._url + "/style.css"
            console.log(this._url + "/style.css")
            document.head.appendChild(css);

        }
        console.log(this._htmlElement)

        return this._htmlElement.body.firstElementChild
    }


}