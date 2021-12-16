import { ph_MeteoItem, ph_Recettes } from "./data/placeholder.js";
import MeteoItem from "./components/MeteoItem/class.js";
import RecetteLivre from "./components/RecetteLivre/class.js";
import Recherche from "./components/Recherche/class.js";
import Navigation from "./components/Navigation/class.js";

let meteoMtl = new MeteoItem(ph_MeteoItem[0])
let livre = new RecetteLivre(ph_Recettes);
let recherche = new Recherche();
let nav = new Navigation();

await meteoMtl.render("meteo")
await livre.render("livre")
await recherche.render("search")
await nav.render("nav")

meteoMtl.addClickEvent(meteoMtl.event_RotateData())