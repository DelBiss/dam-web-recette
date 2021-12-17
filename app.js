import { ph_MeteoItem, ph_Recettes } from "./data/placeholder.js";
import MeteoItem from "./components/MeteoItem/class.js";
import RecetteLivre from "./components/RecetteLivre/class.js";
import Recherche from "./components/Recherche/class.js";
import Navigation from "./components/Navigation/class.js";

let xmlRecette = "./data/recettes.xml"
let meteoMtl = new MeteoItem()
let livre = new RecetteLivre(xmlRecette);
let recherche = new Recherche();
let nav = new Navigation();

nav.setCategories(await livre.event_categories())
recherche.setSearchCallback(livre.event_search())
await meteoMtl.render("meteo")
await livre.render("livre")
await recherche.render("search")
await nav.render("nav")

meteoMtl.addClickEvent(meteoMtl.event_RotateData())