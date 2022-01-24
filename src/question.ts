import Game from "./game.js";

export default class Question {
  public question: string;

  public isAnswered: boolean;

  public showQuestions: boolean = true;

  public answer: string;

  public answers: string[];

  private image: HTMLImageElement;

  //random X and Y for question box
  private randomX: number;

  private randomY: number;


  /**
   * Initialize the Question class
   *
   * @param canvasId id of the canvas
   * @param question the question
   * @param isAnswered true if the question is answered
   * @param answer correct answer
   * @param answers all the possible answers
   */
  public constructor(canvasWidth: number, question: string, isAnswered: boolean, answer: string, answers: string[]) {
    //generate random question on canvas working space
    this.randomX = Math.floor(Math.random() * (canvasWidth - 500)) + 200;
    this.randomY = Math.floor(Math.random() * 750) + 100;

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
   * @returns the image of question
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }
  
  /**
   * Set the image of the question
   *
   * @param image the image of the question
   */
  public setImage(image: HTMLImageElement): void {
    this.image = image;
  }

  /**
   * Get the image
   *
   * @returns the image of the question
   */
   public getIsAnswerd(): boolean {
    return this.isAnswered;
  }
  
  /**
   * Set the image of the GameItem
   *
   * @param image the image of the GameItem
   */
  public setIsAnswered(isAnswered: boolean): void {
    this.isAnswered = isAnswered;
  }

  /**
   * Method to draw a question on the canvas
   * 
   * @param ctx rendering context
   */
  public drawQuestion(ctx: CanvasRenderingContext2D): void {
    if (this.showQuestions) {
      // lets save current state as we make a lot of changes        
      ctx.save();

      ctx.drawImage(this.image, this.randomX - 20, this.randomY + 5,20,20);

      ctx.font = '16px Roboto'

      // draw text from top - makes life easier at the moment
      ctx.textBaseline = 'top';

      // color for background
      ctx.fillStyle = 'rgb(79 70 229)';
      
      // get width of text
      var width = ctx.measureText(this.question + 10).width;

      // draw background rect assuming height of font
      ctx.fillRect(this.randomX + 10, this.randomY, width, parseInt('16px Roboto' , 20));
      
      // text color
      ctx.fillStyle = 'white';

      // draw text on top
      ctx.fillText("  " + this.question, this.randomX + 10, this.randomY + 5);
      
      // restore original state
      ctx.restore();
    }
  }
}
