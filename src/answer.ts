import Game from "./game.js";

export default class Answer {
  public answer: string;

  public isCorrect: boolean;

  public currentQuestion: string;

  private image: HTMLImageElement;

  //random X and Y for answer box
  private randomX: number;

  private randomY: number;

  /**
   * Initialize the Answer class
   *
   * @param canvasWidth width of the canvas
   * @param answer correct answer
   * @param isCorrect if the answer is correct
   * @param currentQuestion current question
   */
  public constructor(canvasWidth: number, answer: string, isCorrect: boolean, currentQuestion: string) {
    //generate random question on canvas working space
    this.randomX = Math.floor(Math.random() * (canvasWidth - 500)) + 200;
    this.randomY = Math.floor(Math.random() * 750) + 100;

    this.answer = answer;
    this.isCorrect = isCorrect;
    this.currentQuestion = currentQuestion;

    this.image = Game.loadNewImage('/assets/images/chest.png');
    this.image.width = 20
    this.image.height = 20
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
   * @returns the image of answer
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Set the image of the answer
   *
   * @param image the image of the answer
   */
  public setImage(image: HTMLImageElement): void {
    this.image = image;
  }

  /**
   * Method to draw the current questionn the canvas
   * 
   * @param ctx rendering context
   */
  public drawCurrentQuestion(ctx: CanvasRenderingContext2D): void {
    let font = '25px ' + localStorage.getItem("playerNameFontFamily");
    // write the answer the image to the canvas
    ctx.font = font 
    ctx.fillStyle = "black"
    ctx.fillText(this.currentQuestion, 100, 100);
  }


  /**
   * Method to draw a answer on the canvas
   * 
   * @param ctx rendering context
   */
  public drawAnswer(ctx: CanvasRenderingContext2D): void {
    // write the answer to the canvas
    ctx.drawImage(this.image, this.randomX, this.randomY,20,20);
    let font = '16px ' + localStorage.getItem("playerNameFontFamily");
    // write the answer the image to the canvas
    ctx.font = font 
    ctx.fillStyle = "white"
    ctx.fillText(this.answer, this.randomX - 0, this.randomY - 10);

    this.drawCurrentQuestion(ctx)
  }
}
