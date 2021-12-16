import { ph_Recettes } from "../data/placeholder.js"

function search(searchTerm, data, isCategories = false) {
    // data = ph_Recettes;
    //////////////////////
    //forof //loop tableau
    //forin //loop object
    
    if (searchTerm.length==0)
    {
        return "c'est vide"
    }else{
    //return searchTerm   
  // Voici un exemple de recherche dans un objet
    var resultat = Array()
    for (const recette of data){
        if(recette.title.search(searchTerm) >=0){
            resultat.push(recette)
            console.log(resultat)
        }
    }
    return resultat

  
}
    
    
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
