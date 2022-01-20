export default class Player {
  public name: string;

  public health: number;

  //random X and Y for question box
  private randomX: number;

  private randomY: number;

  public constructor(canvasWidth: number) {
    //generate random question on canvas working space
    this.randomX = Math.floor(Math.random() * (canvasWidth - 500)) + 200;
    this.randomY = Math.floor(Math.random() * 750) + 100;
  }

  /**
   * Draw a question on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // Draw a question
    ctx.fillStyle = "#b5651e";
    ctx.fillRect(this.randomX, this.randomY, 30,30)
  }
}
