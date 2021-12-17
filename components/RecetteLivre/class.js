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
        this.element.innerHTML = "";
        if (this.state instanceof Array) {
            var cards = await this.GetCards()
            for (const carte of cards) {
                await carte.render(this.element)
            }
        } else {


            let e = new recetteDetail(this.state);
            await e.render(this.element)
        }
    }

    async GetCards() {
        var cards = []
        for (const recette of this.state) {
            let newCard = new RecetteCarte(recette)
                // var callbackData = {
                //     component: this,
                //     data: recette
                // }
            if (await newCard.load()) {
                let callback = this.createCallback(
                    function(e) {
                        console.log(e)
                        this.context.component.showRecette(this.data)
                    },
                    recette
                )
                newCard.addEvent('click', callback)
            }
            cards.push(newCard)
        }
        return cards
    }

    showRecette(recettes) {
        this.state = recettes;
        this.refresh()
    }

    search(searchTerm, isCategories = false) {
        var key = "title";
        if (isCategories) {
            key = "category";
        }

        var resultat = Array();
        if (searchTerm.length != 0) {

            for (const recette of this.props) {
                if (recette[key].toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
                    resultat.push(recette);

                }
            }
        } else {
            return this.props
        }
        return resultat;
    }



    event_search() {
        return this.createCallback(
            function(e) {
                let livre = this.context.component
                let searchResult = livre.search(this.context.target.searchTerm, this.data.isCategories)
                livre.showRecette(searchResult)
            }, { isCategories: false }
        )

    }
}