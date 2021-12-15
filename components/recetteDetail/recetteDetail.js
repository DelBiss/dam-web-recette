// méthode pour afficher les éléments recettes
import { ph_Recettes } from "../../data/placeholder.js";
import Component from "../cComponent/Component.js";

export default class RecetteDetail extends Component {
    constructor(props) {
        super(props, "data-recette-detail");
        this.props = props ? props : ph_Recettes[0];
    }
}