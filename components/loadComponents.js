import * as Utils from "../script/utils.js";
import { ph_MeteoItem, ph_Recettes } from "../data/placeholder.js";
import RecetteDetail from "./recetteDetail/recetteDetail.js"
import MeteoItem from "./MeteoItem/class.js";
import RecetteCarte from "./RecetteCarte/recette-carte.js"

Utils.renderComponentInShowcase(MeteoItem, ph_MeteoItem)
Utils.renderComponentInShowcase(RecetteCarte, ph_Recettes)
Utils.renderComponentInShowcase(RecetteDetail, ph_Recettes)