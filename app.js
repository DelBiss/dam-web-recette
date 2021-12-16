import { ph_MeteoItem, ph_Recettes } from "./data/placeholder.js";
import MeteoItem from "./components/MeteoItem/class.js";
import RecetteLivre from "./components/RecetteLivre/class.js";

let meteoMtl = new MeteoItem(ph_MeteoItem[0])
let livre = new RecetteLivre(ph_Recettes);

await meteoMtl.render("meteo")

await livre.render("livre")

meteoMtl.addClickEvent(meteoMtl.event_RotateData())