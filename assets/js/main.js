$('jeu').ready(function(){

    // Choix des noms des joueurs , si pas remplis noms par defauts
    let defautblue = prompt("Pseudo joueur 1 : ");
    let defautgreen = prompt("Pseudo joueur 2 : ");
    defautblue === null ? defautblue ="Joueur Bleu" : defautblue=defautblue;
    defautgreen === null ? defautgreen="Joueur Vert" : defautgreen=defautgreen;
    $('#Resultat')
    // Ajout de points dans les resultat de chaque personne
    .append("<div id='defautblue'>" + defautblue + " : <span class='points'></span></div>" + "<div id='defautgreen'>" + defautgreen + " : <span class='points'></span></div>")
    
    //Appel de class pour lancer le jeu
    const p4 = new GreenPuissance4('#jeu');
    
    //Pour pouvoir continuer et refaire des parties
  
function rejoue()
{
location.reload();
}
});