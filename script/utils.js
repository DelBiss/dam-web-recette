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