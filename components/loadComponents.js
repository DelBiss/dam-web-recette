import * as Utils from "../script/utils.js";
import { ph_MeteoItem, ph_Recettes } from "../data/placeholder.js";
import recetteDetail from "./recetteDetail/recetteDetail.js"
import MeteoItem from "./MeteoItem/class.js";
import RecetteCarte from "./RecetteCarte/recette-carte.js"
// import fetchXMLRecette from "../script/fetchXML.js";

//Get Live Meteo
// let response = await
// fetch("https://api.weatherapi.com/v1/current.json?key=f111c71466e14bca870155327210212%20&q=Montreal&aqi=no&lang=fr")
//     .then(response => response.json())
//     .then(function(jsonMeteo) {
//         ph_MeteoItem.push(jsonMeteo)
Utils.renderComponentInShowcase(MeteoItem, ph_MeteoItem)
Utils.renderComponentInShowcase(RecetteCarte, ph_Recettes)
Utils.renderComponentInShowcase(recetteDetail, ph_Recettes)