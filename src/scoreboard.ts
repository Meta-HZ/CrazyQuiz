import { Score, getScores, setScore } from "./api/scoreController.js";

export default class Scoreboard {
  private score: number;

  // array with Score objects
  private scores: { name: string; score: number }[] = [];

  public constructor() {
    this.score = 0;
  }

  public getScore(): number {
    return this.score;
  }

  /**
   *  Set the score to the database
   *
   * @param name name of the player
   * @param score score of the player
   */
  public setScore(name: string, score: number): void {
    this.score = score;
    setScore(name, score);
  }

  // Get scores from the database
  public getScores(): Promise<Score[]> {
    getScores().then((res: Score[]) => {
      // sort the scores in descending order
      res.sort((a, b) => b.score - a.score);
      this.scores = res;
    });

    return new Promise((resolve, reject) => {
      resolve(this.scores);
    });
  }

  // Unused
  public setScores(name: string, score: number): void {
    this.scores.push({ name, score });
  }

    /**
     * Draw the Scoreboard on the banner
     *
     */
    public draw(): void {
        let topPlayers = document.getElementById("TopPlayers")
        topPlayers.innerHTML = `Huidige score is: ${this.score}  `
       
        // draw the top 5 scores and names in descending order
        for (let i = 0; i < this.scores.length; i++) {
            // draw an crown emoji for the first place behind the name
            if (i === 0) {
                topPlayers.innerHTML = topPlayers.innerHTML + `en de top 3 is: 🏆 `
            }
            if (i < 3) {
                topPlayers.innerHTML = topPlayers.innerHTML + `${this.scores[i].name}: ${this.scores[i].score}. `
            }
        }
    }
}
