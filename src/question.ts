import Game from "./game.js";

export default class Question {
  public question: string;

  public isAnswered: boolean;

  public answer: string;

  public answers: string[];

  private image: HTMLImageElement;

  private canvasWidth: number;

  //random X and Y for question box
  private randomX: number;

  private randomY: number;

  public constructor(canvasWidth: number, question: string, isAnswered: boolean, answer: string, answers: string[]) {
    this.canvasWidth = canvasWidth;
    //generate random question on canvas working space
    this.randomX = Math.random() * (canvasWidth - 100) + 250;
    this.randomY = Math.random() * (this.canvasWidth - 500) + 300;

    this.question = question;
    this.answer = answer;
    this.isAnswered = isAnswered;
    this.answers = answers;

    this.image = Game.loadNewImage('/assets/images/chest.png');
    this.image.width = 20
    this.image.height = 20
  }

  /**
   * Get the xPosition
   *
   * @returns returns the position on the x-axis
   */
  public getAnswers(): string[] {
    return this.answers;
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

  /**
   * Method to draw a question on the canvas
   * 
   * @param ctx rendering context
   */
  public drawQuestion(ctx: CanvasRenderingContext2D): void {
    // write the question to the canvas
    ctx.drawImage(this.image, this.randomX - 0, this.randomX - 0,20,20);
    let font = '16px ' + localStorage.getItem("playerNameFontFamily");
    // write the player name above player image to the canvas
    ctx.font = font 
    ctx.fillStyle = "white"
    ctx.fillText(this.question, this.randomX - 0, this.randomX - 0,);
  }
}
