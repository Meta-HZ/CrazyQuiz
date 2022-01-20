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
      console.log(res);
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
   * Draw the Scoreboard on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // draw borders
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 200, 250);
    // draw my score
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(`My Score: ${this.score}`, 10, 30);
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Top 3 Scores:", 10, 70);
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    // draw the top 5 scores and names in descending order
    for (let i = 0; i < this.scores.length; i++) {
      // draw an crown emoji for the first place behind the name
      if (i === 0) {
        ctx.fillText(`🏆 `, 10, 110 + i * 30);
      }
      if (i < 3) {
        ctx.fillText(
          `${this.scores[i].name}: ${this.scores[i].score}`,
          40,
          110 + i * 30
        );
      }
    }
  }
}
