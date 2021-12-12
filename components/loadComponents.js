import * as Utils from "../script/utils.js";
import { ph_MeteoItem } from "../../data/placeholder.js";

import MeteoItem from "./MeteoItem/class.js";
// Utils.LoadCSS('./meteo/style.css').then(function() {
//     Utils.renderComponentOnBody(MeteoItem);
// });
document.body.appendChild(await new MeteoItem(ph_MeteoItem[0]).render());
document.body.appendChild(await new MeteoItem(ph_MeteoItem[1]).render());
// let el = await meteo.render();
// console.log(meteo)
// console.log(el)
// document.body.appendChild(meteo)