console.log('Javascript is working!');
import player from './player.js';
let submitBtn = document.getElementById("CQ-startGame");
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    document.location.href = '/subjects.html';
    createPlayer();
});
function createPlayer() {
    let newPlayer = new player();
    newPlayer.setName(document.getElementById('playerName').value);
    newPlayer.setAppearanceSource("/assets/images/steve.png");
    newPlayer.displayPlayer();
}
//# sourceMappingURL=app.js.map