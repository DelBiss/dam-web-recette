import Header from "./components/Header/class.js";
import { ph_MeteoItem, ph_Recettes } from "./data/placeholder.js";
import MeteoItem from "./components/MeteoItem/class.js";

let meteoMtl = new MeteoItem(ph_MeteoItem[0])
let meteoLvl = new MeteoItem(ph_MeteoItem[1])
let head = new Header({ titre: "Les recettes de Baba" });
head.addComponent("meteo-mtl", meteoMtl)
head.addComponent("meteo-lvl", meteoLvl)
await head.render(document.body)