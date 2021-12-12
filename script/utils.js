//@ts-check
/**
 * @template {keyof HTMLElementTagNameMap} T 
 * @param {T} tagName
 * @param {...string} cssClass
 * @returns {HTMLElementTagNameMap[T]}
 */
export function createElementWithCSS(tagName, ...cssClass) {
    let element = document.createElement(tagName);
    element.classList.add(...cssClass);
    let a = document.createElement("img")
    return element;
}

/**
 * @param {{new(props:any):object,render():Node}} ComponentClass
 * @param {any} props
 */
export function renderComponentOnBody(ComponentClass, props = null) {
    let componentItem = document.body.appendChild(createElementWithCSS("article", "component-list-item"))
    let componentTitle = componentItem.appendChild(createElementWithCSS("h2", "component-list-item-header"));
    componentTitle.textContent = ComponentClass.prototype.constructor.name

    let component = new ComponentClass(props)
    componentItem.appendChild(component.render());
}

/**
 * 
 * @param {HTMLElement} element - Element to fill with data
 * @param {string} selector - DataAttribute to fill
 * @param {*} props - Data to use
 * @returns {HTMLElement} - Element filled with data
 */
export function fillDataTemplate(element, selector, props) {
    let allDataElement = element.querySelectorAll(`[${selector}]`);
    const datasetKey = getDatasetKeyFromSelector(selector)
    for (var dataElement of allDataElement) {
        let key = dataElement.dataset[datasetKey].split(".")
        var d = props;

        for (var k of key) {
            d = d[k];
        }
        dataElement.textContent = d;
    }
    return element
}

/**
 * @param {string} selector - Attribute used in HTML (ex: "data-meteo-item"). "data" part is optional
 * @return {string} - Key for the dataset (ex: "meteoItem")
 */
export function getDatasetKeyFromSelector(selector) {
    var selectorArray = selector.split("-")

    if (selectorArray[0] == "data") {
        selectorArray.shift()
    }

    return selectorArray.join(" ").replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');;
}
/**
 * @param {string} cssURL
 */
export function LoadCSS(cssURL) {

    // 'cssURL' is the stylesheet's URL, i.e. /css/styles.css

    return new Promise(function(resolve, reject) {

        var link = document.createElement('link');

        link.type = 'text/css';
        link.rel = 'stylesheet';

        link.href = cssURL;
        document.head.appendChild(link);

        link.onload = function() {

            console.log('CSS has loaded!');
            resolve();

        };
    });
}