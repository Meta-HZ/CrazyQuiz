import Game from "./game.js";

export default class Answer {
  public answer: string;

  public isCorrect: boolean;

  private image: HTMLImageElement;

  //random X and Y for answer box
  private randomX: number;

  private randomY: number;

  public constructor(canvasWidth: number, answer: string, isCorrect: boolean) {
    //generate random question on canvas working space
    this.randomX = Math.floor(Math.random() * (canvasWidth - 500)) + 200;
    this.randomY = Math.floor(Math.random() * 750) + 100;

    this.answer = answer;
    this.isCorrect = isCorrect;

    this.image = Game.loadNewImage('/assets/images/chest.png');
  }
  
  /**
   * Get the xPosition
   *
   * @returns returns the position on the x-axis
   */
  public getXPosition(): number {
    return this.randomX;
  }

  /**
   * Set the xPosition
   *
   * @param xPosition - set a new xPosition
   */
  protected setXPosition(randomX: number): void {
    this.randomX = randomX;
  }

  /**
   * Get the yPosition
   *
   * @returns returns the position on the y-axis
   */
  public getYPosition(): number {
    return this.randomY;
  }

  /**
   * Set the yPosition
   *
   * @param yPosition - set a new yPosition
   */
  protected setYPosition(randomY: number): void {
    this.randomY = randomY;
  }

    /**
   * Get the image
   *
   * @returns the image of  the GameItem
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Set the image of the GameItem
   *
   * @param image the image of the GameItem
   */
  public setImage(image: HTMLImageElement): void {
    this.image = image;
  }

  /**
   * Method to draw a question on the canvas
   * 
   * @param ctx rendering context
   */
  public drawAnswer(ctx: CanvasRenderingContext2D): void {
    // write the player to the canvas
    ctx.drawImage(this.image, this.randomX, this.randomY,20,20);
    let font = '16px ' + localStorage.getItem("playerNameFontFamily");
    // write the player name above player image to the canvas
    ctx.font = font 
    ctx.fillStyle = "white"
    ctx.fillText(this.answer + " " + this.isCorrect, this.randomX - 0, this.randomY - 10);
  }
}
