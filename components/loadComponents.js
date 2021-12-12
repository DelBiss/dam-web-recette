import * as Utils from "../script/utils.js";

import MeteoItem from "./MeteoItem/class.js";
// Utils.LoadCSS('./meteo/style.css').then(function() {
//     Utils.renderComponentOnBody(MeteoItem);
// });
let meteo = new MeteoItem();
let el = await meteo.render();
// console.log(meteo)
// console.log(el)
document.body.appendChild(el)