export default class Question {
  public question: string;

  private answers: string[];

  public health: number;

  //random X and Y for question box
  private randomX: number;

  private randomY: number;

  public constructor(canvasWidth: number, question: string, answers: string[]) {
    //generate random question on canvas working space
    this.randomX = Math.floor(Math.random() * (canvasWidth - 500)) + 200;
    this.randomY = Math.floor(Math.random() * 750) + 100;

    this.question = question;
    this.answers = answers;
  }

  /**
   * Draw a question on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // Draw a question
    ctx.fillStyle = "#b5651e";
    ctx.fillText(this.question, this.randomX, this.randomY)
    ctx.fillRect(this.randomX, this.randomY, 30,30)
  }
}
