import * as Utils from "../script/utils.js";
import { ph_MeteoItem } from "../../data/placeholder.js";

import MeteoItem from "./MeteoItem/class.js";
// Utils.LoadCSS('./meteo/style.css').then(function() {
//     Utils.renderComponentOnBody(MeteoItem);
// });

Utils.renderComponentInShowcase(MeteoItem, ph_MeteoItem)
    // const meteo1 = new MeteoItem(ph_MeteoItem[0])
    // const meteo2 = new MeteoItem(ph_MeteoItem[1])
    // await meteo1.render(document.body);
    // await meteo2.render(document.body);

// let el = await meteo.render();
// console.log(meteo)
// console.log(el)
// document.body.appendChild(meteo)