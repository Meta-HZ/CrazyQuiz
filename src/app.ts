console.log('Javascript is working!');

let submitBtn = document.getElementById("CQ-startGame");
// add event click listener on form submit button
submitBtn.addEventListener("click", function(event) {
    // preventDefault to stop page from reloading
    event.preventDefault();

    let enteredPlayerName = (<HTMLInputElement>document.getElementById('playerName')).value

    if(enteredPlayerName) {
        setPlayerName(enteredPlayerName);
        document.location.href = '/subjects.html';
    } else {
        alert("Please enter your desired player name")
    }
    
});

function setPlayerName(name: string) {
    localStorage.setItem('playerName', name)

    console.log(localStorage.getItem('playerName'))
}