/********************************************************************************
/*
 * MMI Smart (jQuery Plugin d'aide étudiant)
 * 2020 by Emilien CHAPTARD (Emilien.CHAPTARD@etu.uca.fr)
 *
 * Version 1.0.0
 * 
 * Requires jQuery 3.4.1
 *
 * licensed under MIT
 *   http://en.wikipedia.org/wiki/MIT_License
 *
*/

(function($){
    $.fn.mmiSmart = function() {
         return this.each(function(){
            //Changement du texte "chargement..." dans le html après chargement terminé
            var base = this;
            $(base).text("Bienvenue 👋");
            //Affichage des alertes JS : chaque nombre est une touche du clavier
            let textarea = document.getElementById('texte')
            var une = 0;
            var one = 0;

            textarea.addEventListener('input', () => {
                if (une == 0) {
                    alert("👏 C'est un bon début! 👏 Continu en écrivant la bonne structure avant les titres. ⚠️ N'oublie pas de fermer toutes les balises que tu ouvres comme cela </section>, </h1>, </h2>...  3,2,1 Codez!");
                    une++;
                    console.log('Une touche du clavier a été cliqué : affiche le 1er message');
                }
                else {}
            });              

            $(document).on('keypress',function(data) {
                if(data.which == 60 && one == 0) {
                    alert("Très bien! 👍 Continue!  N'oublie pas de fermer la balise 😉");
                    one++;
                    console.log('Touche "<" click');
                }
                else {}
            });

         })
    }

}(jQuery));

$("h1").mmiSmart({});

// Fonction ajout de la balise au click
function AjoutTexte(event) {
    var targ = event.target || event.srcElement;
    document.getElementById("texte").value += targ.textContent || targ.innerText;
}

// Fonction recupération et affichage de données JSON en ligne via la méthode AJAX
var afficherInfo = document.getElementById("info");
var btn = document.getElementById("bouton");
var nbs0 = 0;

btn.addEventListener("click", function() {
    var Requete = new XMLHttpRequest();
    Requete.open('GET', 'https://emchaptard.github.io/data/balises.json');
    Requete.onload = function() {
        if (Requete.status >= 200 && Requete.status < 400) {
        var donnees = JSON.parse(Requete.responseText);
        AjoutHTML(donnees);
        } else {
        console.log("Erreur");
        }
    };

    Requete.onerror = function() {
        console.log("Erreur connection");
    };

    Requete.send();
    //cache le bouton après le click
    nbs0++;
    if (nbs0 == 1) {
        btn.classList.add("suppr");
    }
});

// Fonction recupération et affichage de données JSON en ligne via la méthode AJAX
var afficherInfo2 = document.getElementById("cor");
var btn2 = document.getElementById("boutonCor");
var nbs = 0;

btn2.addEventListener("click", function() {
    var Requete2 = new XMLHttpRequest();
    Requete2.open('GET', 'https://emchaptard.github.io/data/correction.json');
    Requete2.onload = function() {
        if (Requete2.status >= 200 && Requete2.status < 400) {
        var donnees2 = JSON.parse(Requete2.responseText);
        AjoutHTML2(donnees2);
        } else {
        console.log("Erreur");
        } 
    };

    Requete2.onerror = function() {
        console.log("Erreur connection");
    };

    Requete2.send();

});


// btn1 = Ajout de mise en forme HTML aux données JSON
function AjoutHTML(data) {
    //affiche la correction dans un <p>
    var chaineHtml = "";

    for (i = 0; i < data.length; i++) {
        chaineHtml += "<p><br><h2 onclick='AjoutTexte(event)'><strong>La balise </strong><code>&lt;" + data[i].nom + "&gt;</code></h2><br>" + data[i].description + "<br><br>";
    
        chaineHtml += '</p>';
    }
    afficherInfo.insertAdjacentHTML('beforeend', chaineHtml);

}

// btn2 = Ajout de mise en forme HTML aux données JSON
function AjoutHTML2(data) {

    //Si il n'y a pas de texte dans le textarea alors on affiche une alerte, pas directement la correction
    if (!$.trim($("#texte").val())) {
        alert("😢 Tu ne veux pas essayer avant ? Tu peux y arriver !");
    }
    else
    {
    //cache le bouton après le click
    nbs++;
    if (nbs == 1) {
        btn2.classList.add("suppr");
    }
    //affiche la correction dans un <p>
    var chaineHtml = "";
    for (i = 0; i < data.length; i++) {
        chaineHtml += "<p class='balise'><h2>" + data[i].head + "</h2><br><br><div onclick='AjoutTexte(event)'>" + data[i].info + "</div><br><br>";
        chaineHtml += '</p>';
    }
    afficherInfo2.insertAdjacentHTML('beforebegin', chaineHtml);
    }
}