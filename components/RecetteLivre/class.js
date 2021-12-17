//@ts-check
import Component from "../cComponent/Component.js";
import { ph_Recettes } from "../../data/placeholder.js";
import RecetteCarte from "../RecetteCarte/recette-carte.js";
import recetteDetail from "../recetteDetail/recetteDetail.js";

export default class RecetteLivre extends Component {
    constructor(props) {
        super(props, "data-recette-livre");

        this.props = props ? props : ph_Recettes;
        this.state = null
        if (!(typeof this.props == "string" || this.props instanceof String)) {
            this.state = this.props
        }
        this.card = []
        this.cardElement = []


    }

    async loadData() {
        if (typeof this.props == "string" || this.props instanceof String) {
            this.props = await this.fetchXMLRecette(this.props)
            this.state = this.props
        }
    }
    async load() {
        await this.loadData()
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

    async GetCategories() {
        await this.loadData()
        const listeCategories = new Set();

        for (const recette of this.props) {

            listeCategories.add(recette.category)
        }

        return listeCategories
    }

    async event_categories() {
        let categories = await this.GetCategories();
        let callbackFct = function() {
            let livre = this.context.component
            let searchResult = livre.search(this.data.searchTerm, this.data.isCategories)
            livre.showRecette(searchResult)
        }
        let retour = [this.createCallback(
            callbackFct, {
                searchTerm: "",
                label: `<a href="#">Accueil</a>`,
                isCategories: true
            })]

        for (const cat of categories) {
            let catCallback = this.createCallback(
                callbackFct, {
                    searchTerm: cat,
                    label: `<a href="#">${cat}</a>`,
                    isCategories: true
                }
            )
            retour.push(catCallback)
        }
        return retour;
    }

    async fetchXMLRecette(xmlPath) {
        let xmlFile = await fetch(xmlPath)
        let xmlText = await xmlFile.text()
        let allRecettes = [];

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlText, "application/xml");

        for (const recette of xmlDoc.getElementsByTagName("recipe")) {
            allRecettes.push(this.parseRecette(recette))
        }


        return allRecettes
    }

    /**
     * @param {Element} [xmlNode]
     */
    parseRecette(xmlNode) {
        let recette = {};

        recette["id"] = xmlNode.getAttribute("id")

        for (const field of xmlNode.children) {
            if (field.childElementCount == 0) {
                recette[field.tagName] = field.textContent
            } else {
                recette[field.tagName] = Array()
                for (const listItem of field.children) {
                    recette[field.tagName].push(listItem.textContent)
                }
            }
        }

        recette.image = recette.image ? "images/" + recette.image : "images/no-image-found.png"
        return recette
    }

}