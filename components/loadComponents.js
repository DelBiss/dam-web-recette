import * as Utils from "../script/utils.js";

import MeteoItem from "./meteo/class.js";
Utils.LoadCSS('./meteo/style.css').then(function() {
    Utils.renderComponentOnBody(MeteoItem);
});