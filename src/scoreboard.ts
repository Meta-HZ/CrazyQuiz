export default class Scoreboard {

    private score: number;

    // array with Score objects
    private scores: { name: string, score: number }[] = [];

    public constructor() {
        this.score = 0;

    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    // return the top 5 scores and names in ascending order
    public getScores(): { name: string, score: number }[] {
        return this.scores.slice(0, 5);
    }


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
        ctx.font = '30px Arial';
        ctx.fillStyle = "green";
        ctx.fillText(`My Score: ${this.score}`, 10, 30);
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Top 5 Scores:", 10, 70);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        // draw the top 5 scores and names in according order from getScores()
        for (let i = 0; i < this.getScores().length; i++) {
            // draw an crown emoji for the first place behind the name
            if (i === 0) {
                ctx.fillText(`🏆 `, 10, 110 + (i * 30));
            }
            ctx.fillText(`${this.getScores()[i].name}: ${this.getScores()[i].score}`, 40, 110 + (i * 30));
        }
    }
}
