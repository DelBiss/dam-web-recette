//@ts-check
export default async function fetchXMLRecette(xmlPath) {
    let xmlFile = await fetch(xmlPath)
    let xmlText = await xmlFile.text()
    console.log(xmlText)
    let data = [];

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlText, "application/xml");

    for (const recette of xmlDoc.getElementsByTagName("recipe")) {
        data.push(parseRecette(recette))
    }


    return data
}

/**
 * @param {Element} [xmlNode]
 */
function parseRecette(xmlNode) {
    let data = {};

    data["id"] = xmlNode.getAttribute("id")

    for (const field of xmlNode.children) {
        if (field.childElementCount == 0) {
            data[field.tagName] = field.textContent
        } else {
            data[field.tagName] = Array()
            for (const listItem of field.children) {
                data[field.tagName].push(listItem.textContent)
            }
        }
    }

    data.image = data.image ? "images/" + data.image : "images/no-image-found.png"
    return data
}