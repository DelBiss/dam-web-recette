import { fillDataTemplate } from "../../script/utils.js";

// @ts-check
export default class Component {

    /**
     * @param {any} props
     */
    constructor(props, datasetRoot) {
        this.props = props;
        this.datasetRoot = datasetRoot;
        this._htmlElement = null;
        this.components = {};
        // this._html = null;

        this.loaded = {
            html: false,
            css: false,
            element: false,
            filled: false,
            completed: false
        };
        this._url = new URL("../" + this.constructor.name,
            // @ts-ignore
            import.meta.url);

    }

    async load() {
        await this.loadHTML()

        await this.loadElement()
        this.fillElement()
        this.fillComponent()
        this.loaded.completed = true;
        return true
    }

    async loadHTML() {
        if (this.html != null) {
            this.loaded.html = true
        }
        if (!this.loaded.html) {
            try {
                let response = await fetch(this._url.href + "/index.html");
                if (!response.ok) {
                    throw new Error(`HTTP error load component html! status: ${response.status}`);
                } else {
                    this.constructor.prototype.html = await response.text();
                    this.loaded.html = true;
                    await this.loadCSS()
                        // this._html = await response.text();

                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async loadCSS() {
        if (this.loaded.html) {
            if (!this.loaded.css) {
                var baseURL = this._url + "/"
                var ComponentName = this.constructor.name
                let dom = new DOMParser().parseFromString(this.html, "text/html");
                let allCSS = dom.head.querySelectorAll('[rel="stylesheet"');
                var allPromise = [];

                for (var css of allCSS) {
                    var p = new Promise(function(resolve) {
                        let cssURL = css.attributes.getNamedItem("href").value
                        css.attributes.getNamedItem("href").value = baseURL + cssURL;
                        css.onload = function() {

                            // console.log(`CSS '${cssURL}' for ${ComponentName} has loaded!`);
                            resolve();

                        };
                        document.head.appendChild(css);
                    });
                    allPromise.push(p);
                }

                await Promise.all(allPromise);
                this.loaded.css = true;
            }
        } else {
            throw new Error(`'${this.constructor.name}' HTML need to be loaded before loading CSS`)
        }
    }

    async loadElement() {
        if (this.loaded.html) {
            if (!this.loaded.element) {
                var e = new DOMParser().parseFromString(this.html, "text/html").body
                this._element = e.firstElementChild
                this.loaded.element = true
            }
        } else {
            throw new Error(`'${this.constructor.name}' HTML need to be loaded before loading HTML element`)
        }
    }

    /**
     * @returns {HTMLElement}
     */
    get element() {
        if (this.loaded.element) {
            return this._element
        } else {
            throw new Error(`'${this.constructor.name}' need to be loaded before accessing element`)
        }
    }

    /**
     * Render the Location section
     * @param {HTMLElement} element
     */
    fillElement(tagName = null, data = null) {
        data = data ? data : this.props;
        tagName = tagName ? tagName : this.datasetRoot

        this._element = fillDataTemplate(this.element, tagName, data);
        this.loaded.element = true
        return this.element
    }

    async fillComponent() {
        for (const key in this.components) {
            if (Object.hasOwnProperty.call(this.components, key)) {
                const c = this.components[key];
                var e = this.element.querySelector(`[data-component=${key}]`);
                if (e != null) {

                    await c.renderReplace(e);
                }
            }
        }
    }

    addComponent(name, component) {
        this.components[name] = component
    }

    /**
     * @param {HTMLElement} [elementWhere]
     */
    async render(elementWhere) {

        if (typeof elementWhere === 'string' || elementWhere instanceof String) {
            elementWhere = document.getElementById(elementWhere)
        }


        await this.load()
        return elementWhere.appendChild(this.element);
    }

    /**
     * @param {HTMLElement} [elementWhere]
     */
    async renderReplace(elementWhere) {
        await this.load()
        let parentNOde = elementWhere.parentNode;
        return parentNOde.replaceChild(this.element, elementWhere)
    }

    refresh() {
        this.fillElement()
        this.fillComponent()
    }

    addClickEvent(callback) {
        this.element.addEventListener("click", callback)
    }




}