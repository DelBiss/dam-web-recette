import { ph_Recettes } from "../data/placeholder.js"

function search(searchTerm, data, isCategories = false) {
    // data = ph_Recettes;
    //////////////////////
    //forof //loop tableau
    //forin //loop object
    
    if (searchTerm.length==0)
    {
        return "c'est vide"
    }else
    //return searchTerm
  // Voici un exemple de recherche dans un objet
    return data[0].title.search(searchTerm)
    data[0].category.search(searchTerm)
    data[0].preptime.search(searchTerm)
    data[0].cooktime.search(searchTerm)
    data[0].yield.search(searchTerm)
    data[0].ingredient_list.search(searchTerm)
    data[0].instruction_list.search(searchTerm)
    // ce qu'il faut améliorer:

    //on parcours le premier objet et on recçot une valeur positive ou négative on stock à la position [i]
    //on parcours le deuxième objet et on recçot une valeur positive ou négative on stock à la position [i]  
    // on parcours jusqu'à la fin.
    
    // la recherche est un boolean qui vérifie si 'searchTerm' est dans l'objet
    // Si le résultat d'une recherche dans un objet est une valeur positive
    // on stock dans un tableau l'id de l'objet de chaque résultat valeur positive
    // la méthode retourne un tableau ou une liste des recettes à afficher
    
    // Ensuite il faut rechercher dans plusieurs objets
    // faire afficher
    
    return data[0] 
    return data
}

//texte instanceof Array

function test() {
    console.log(document.form1.recherche.value)
    let response = search(document.form1.recherche.value, ph_Recettes)
    if (response == null) {
        document.getElementById("resp").textContent = "Reponse null"

    } else if (response.length == 0) {
        document.getElementById("resp").textContent = "Aucun output"
    } else {
        document.getElementById("resp").textContent = JSON.stringify(response, null, 2)
    }

}
window.test = test

     
     


    

//texte instanceof Array
