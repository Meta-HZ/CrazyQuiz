console.log('Javascript is working!');
import player from './player.js';


let submitBtn = document.getElementById("CQ-startGame");
// add event click listener on form submit button
submitBtn.addEventListener("click", function(event) {
    // preventDefault to stop page from reloading
    event.preventDefault();
    document.location.href = '/subjects.html';
    createPlayer();
});

//Create an player and set its name and appearance.
function createPlayer () {
    let newPlayer = new player();
    // to create a new instance of a class

    newPlayer.setName((<HTMLInputElement>document.getElementById('playerName')).value);
    newPlayer.setAppearanceSource("/assets/images/steve.png");

    newPlayer.displayPlayer();
}


// function loadNewImage(source: string): HTMLImageElement {
//     const img = new Image();
//     img.src = source;
//     return img;
// }