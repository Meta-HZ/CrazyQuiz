console.log('Scoreboard is working!');

import { Score, getScores } from "./api/scoreController.js";

let scoreboard = document.getElementById("scoreboard");

getScore();
function getScore() {
    getScores().then((res: Score[]) => {
        // sort the scores in descending order
        res.sort((a, b) => b.score - a.score);
        console.log(res);
        scoreboard.innerHTML = "";
        res.forEach(score => {
            scoreboard.innerHTML += `<ul>${score.name}: ${score.score}</ul>`;
        });
    });
}
    


