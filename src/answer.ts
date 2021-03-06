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
    // write the answer the image to the canvas
    ctx.font = '20px Roboto' 
    ctx.fillStyle = "white"
    ctx.fillText(this.currentQuestion, 100, 100);
  }


  /**
   * Method to draw a answer on the canvas
   * 
   * @param ctx rendering context
   */
  public drawAnswer(ctx: CanvasRenderingContext2D): void {
    // write the answer to the canvas
    // lets save current state as we make a lot of changes        
    ctx.save();

    ctx.drawImage(this.image, this.randomX - 20, this.randomY + 5,20,20);
    
    // write the question above question image to the canvas
    ctx.font = '16px Roboto' 

    // draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';

    // color for background
    ctx.fillStyle = 'rgb(79 70 229)';
    
    // get width of text
    var width = ctx.measureText(this.answer + 10).width;

    // draw background rect assuming height of font
    ctx.fillRect(this.randomX + 10, this.randomY, width, parseInt('16px Roboto' , 20));
    
    // text color
    ctx.fillStyle = 'white';

    // draw text on top
    ctx.fillText("  " + this.answer, this.randomX + 10, this.randomY + 5);
    
    // restore original state
    ctx.restore();

    this.drawCurrentQuestion(ctx)
  }
}
