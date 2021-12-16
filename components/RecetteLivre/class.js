//@ts-check
import Component from "../cComponent/Component.js";
import { ph_Recettes } from "../../data/placeholder.js";
import RecetteCarte from "../RecetteCarte/recette-carte.js";
import recetteDetail from "../recetteDetail/recetteDetail.js";

export default class RecetteLivre extends Component {
    constructor(props) {
        super(props, "data-recette-livre");
        this.props = props ? props : ph_Recettes;
        this.state = this.props;
        this.card = []
        this.cardElement = []


    }

    async load() {
        await super.load();

        return true
    }

    async fillComponent() {

        console.log(`fillComponent: State = ${this.state}`)
        if (this.state instanceof Array) {
            var cards = await this.GetCards()
            for (const carte of cards) {
                await carte.render(this.element)
            }
        } else {
            this.element.innerHTML = "";

            let e = new recetteDetail(this.state);
            await e.render(this.element)
        }
    }

    async GetCards() {
        var cards = []
        for (const recette of this.props) {
            let newCard = new RecetteCarte(recette)
            var callbackData = {
                component: this,
                data: recette
            }
            if (await newCard.load()) {
                newCard.addClickEvent(
                    function() {
                        console.log("=========")
                        console.log(this.data)
                        console.log(this.component)
                        this.component.showDetail(this.data)
                    }.bind(callbackData)
                )
            }
            cards.push(newCard)
        }
        return cards
    }

    showDetail(recette) {
        this.state = recette;
        console.log("State Changed")
        this.refresh()
    }

    showRecette(recettes) {
        this.props = recettes;
        this.refresh()
    }

    search(searchTerm, data, isCategories = false) {
        var key = "title";
        if (isCategories) {
            key = "category";
        }

        var resultat = Array();
        if (searchTerm.length != 0) {

            for (const recette of data) {
                if (recette[key].toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
                    resultat.push(recette);
                    console.log(resultat);
                }
            }
        }
        return resultat;
    }

    searchRecette(searchTerm) {

    }
    event_search() {
        let callbackData = {
            data: {
                search: "Poulet",
                component: this
            },

            fct: function() {
                let recettes = this.component.search(this.)
                this.component.showRecette
            }
        }
    }
}