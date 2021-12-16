//@ts-check
import Component from "../cComponent/Component.js";
import { ph_Recettes } from "../../data/placeholder.js";
import RecetteCarte from "../RecetteCarte/recette-carte.js";
import recetteDetail from "../recetteDetail/recetteDetail.js";

export default class RecetteLivre extends Component {
    constructor(props) {
        super(props, "data-recette-livre");
        this.props = props ? props : ph_Recettes;
        this.state = 0;
        this.card = []
        this.cardElement = []

    }

    async load() {
        await super.load();

        return true
    }

    async fillComponent() {
        if (this.card.length == 0) {
            await this.loadCard()
        }
        console.log(`fillComponent: State = ${this.state}`)
        if (this.state == 0) {
            for (const carte of this.card) {
                await carte.render(this.element)
            }
        } else {
            this.element.innerHTML = "";

            let e = new recetteDetail(this.state);
            await e.render(this.element)
        }
    }

    async loadCard() {
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
            this.card.push(newCard)
        }
    }

    showDetail(recette) {
        this.state = recette;
        console.log("State Changed")
        this.refresh()
    }
}