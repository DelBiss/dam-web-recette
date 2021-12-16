import { ph_Recettes } from "../data/placeholder.js";

function search(searchTerm, data, isCategories = false) {
    // data = ph_Recettes;
    //////////////////////
    //forof //loop tableau
    //forin //loop object
    var key = "title";
    if (isCategories) {
        key = "category";
    }
    if (searchTerm.length == 0) {
        return "c'est vide";
    } else {
        //return searchTerm
        // Voici un exemple de recherche dans un objet
        var resultat = Array();
        for (const recette of data) {
            if (recette[key].toLowerCase().search(searchTerm.toLowerCase()) >= 0) {
                resultat.push(recette);
                console.log(resultat);
            }
        }
        return resultat;
    }

    return data[0];
    return data;
}

//texte instanceof Array
function GetCategories(data) {

}

function test() {
    document.getElementById("resp").textContent = GetCategories(ph_Recettes);

}
window.test = test;

//texte instanceof Array