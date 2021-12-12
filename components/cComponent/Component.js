// @ts-check
export default class Component {

    /**
     * @param {any} props
     */
    constructor(props, datasetRoot) {
        this.props = props;
        this.datasetRoot = datasetRoot;
        this._htmlElement = null;
        // this._html = null;


        this._url = new URL("../" + this.constructor.name,
            // @ts-ignore
            import.meta.url);
        this.getHtml();
        this.getElement();
        this.fillElement();
    }

    async getHtml() {
        if (this._html == null) {
            try {
                let response = await fetch(this._url.href + "/index.html");
                if (!response.ok) {
                    throw new Error(`HTTP error load component html! status: ${response.status}`);
                } else {
                    this.constructor.prototype._html = await response.text();
                    // this._html = await response.text();
                    await this.loadCSS(this.constructor.prototype._html)
                }
            } catch (error) {
                console.log(error);
            }
        }
        return this._html;
    }

    async loadCSS(html) {
        var baseURL = this._url + "/"
        var ComponentName = this.constructor.name
        let dom = new DOMParser().parseFromString(html, "text/html");
        let allCSS = dom.head.querySelectorAll('[rel="stylesheet"');
        var allPromise = [];

        for (var css of allCSS) {
            var p = new Promise(function(resolve) {
                let cssURL = css.attributes.getNamedItem("href").value
                css.attributes.getNamedItem("href").value = baseURL + cssURL;
                css.onload = function() {

                    console.log(`CSS '${cssURL}' for ${ComponentName} has loaded!`);
                    resolve();

                };
                document.head.appendChild(css);
            });
            allPromise.push(p);
        }

        await Promise.all(allPromise);
    }

    async getElement() {

        if (this._htmlElement == null) {

            this._htmlElement = new DOMParser().parseFromString(await this.getHtml(), "text/html")
                // let css = this._htmlElement.head.querySelector('[rel="stylesheet"');
                // css.attributes.getNamedItem("href").value = this._url + "/style.css"
                // console.log(this._url + "/style.css")
                // document.head.appendChild(css);

        }
        return this._htmlElement //.body.firstElementChild
    }

    /**
     * Render the Location section
     * @param {HTMLElement} element
     */
    async fillElement(data = null, tagName = null, element = null) {
        data = data ? data : this.props;
        tagName = tagName ? tagName : this.datasetRoot

        if (element == null) {
            if (this._htmlElement == null) {
                this.getElement()
            }
            element = this._htmlElement;
        }
        // element = element ? element : await this.getElement();
        let allDataElement = element.querySelectorAll(`[data-meteo-item]`);

        for (var dataElement of allDataElement) {
            console.log(dataElement.dataset["meteoItem"])
            let key = dataElement.dataset["meteoItem"].split(".")
            var d = data;

            for (var k of key) {
                d = d[k];
            }
            dataElement.textContent = d;
        }

    }

    getPropsDataFromStringIndex(str) {

    }

}