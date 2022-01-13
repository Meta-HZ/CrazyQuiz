console.log('Javascript is working!');

let submitBtn = document.getElementById("CQ-startGame");
// add event click listener on form submit button
submitBtn.addEventListener("click", function(event) {
    // preventDefault to stop page from reloading
    event.preventDefault();

    // get value out of input
    let enteredPlayerName = (<HTMLInputElement>document.getElementById('playerName')).value

    // check if entered text is not empty
    if(enteredPlayerName) {
        localStorage.setItem('playerName', enteredPlayerName)
        document.location.href = '/game.html';
    } else {
        alert("Please enter your desired player name")
    }
    
});