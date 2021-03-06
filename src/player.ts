import Game from "./game.js";
import KeyboardListener from "./KeyboardListener.js";
import Question from "./question.js";
import Answer from "./answer.js";

export default class Player {
  public name: string;

  public health: number;

  public hasCollidedWithQuestion: boolean;

  public hasCollidedWithAnswer: boolean;

  private xPosition: number;

  private yPosition: number;

  private speed: number;

  private keyBoardListener: KeyboardListener;

  private image: HTMLImageElement;

  private healthImage: HTMLImageElement;

  private canvas: CanvasRenderingContext2D;

  /**
   * Initialize the Player class
   */
  public constructor() {
    this.name = localStorage.getItem("playerName");
    this.health = 3;
    this.hasCollidedWithQuestion = false
    this.hasCollidedWithAnswer = false
    this.speed = 4;
    this.image = Game.loadNewImage("/assets/images/steve-front-side.png");
    this.healthImage = Game.loadNewImage("/assets/images/heart.png");
    this.setXPosition(60);
    this.setYPosition(140);

    this.keyBoardListener = new KeyboardListener();
  }

  /**
   * Sets the player name
   *
   * @param name name of the player
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   *
   * @returns the player name
   */
  public getName(): string {
    return this.name;
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
   * Sets the player health
   *
   * @param health the new health
   */
  private setHealth(health: number): void {
    this.health = health;
  }
  /**
   * Returns the health
   *
   * @returns the health of the player
   */
  private getHealth(): number {
    return this.health;
  }

  /**
   * Get the xPosition
   *
   * @returns returns the position on the x-axis
   */
  public getXPosition(): number {
    return this.xPosition;
  }

  /**
   * Set the xPosition
   *
   * @param xPosition - set a new xPosition
   */
  protected setXPosition(xPosition: number): void {
    this.xPosition = xPosition;
  }

  /**
   * Get the yPosition
   *
   * @returns returns the position on the y-axis
   */
  public getYPosition(): number {
    return this.yPosition;
  }

  /**
   * Set the yPosition
   *
   * @param yPosition - set a new yPosition
   */
  protected setYPosition(yPosition: number): void {
    this.yPosition = yPosition;
  }

  /**
   * Get the speed
   *
   * @returns returns the speed
   */
  public getSpeed(): number {
    return this.speed;
  }

  /**
   * Set the speed
   *
   * @param speed - set a new speed
   */
  protected setSpeed(speed: number): void {
    this.speed = speed;
  }

  /**
   * Method to move the player on the canvas
   */
  public move(): void {
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
      this.xPosition = this.xPosition - this.speed;
      this.image = Game.loadNewImage("/assets/images/steve-left-side.png");
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
      this.xPosition = this.xPosition + this.speed;
      this.image = Game.loadNewImage("/assets/images/steve-right-side.png");
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.yPosition = this.yPosition - this.speed;
      this.image = Game.loadNewImage("/assets/images/steve-back-side.png");
    }
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
      this.yPosition = this.yPosition + this.speed;
      this.image = Game.loadNewImage("/assets/images/steve-front-side.png");
    }
  }

  /**
   * Method to determine if the player is colliding with a question
   *
   * @param questions current questions in the game
   * @returns Question that player has collided with
   */
  public collidesWithBlock(questions: Question[]): Question {
    let collidedQuestion: Question;
    this.hasCollidedWithQuestion = false;
    questions.forEach((question) => {
      if (
        this.getXPosition() < question.getXPosition() + question.getImage().width &&
        this.getXPosition() + this.getImage().width > question.getXPosition() &&
        this.getYPosition() < question.getYPosition() + question.getImage().height &&
        this.getYPosition() + this.getImage().height > question.getYPosition()
      ) {
        this.hasCollidedWithQuestion = true;
        if (!question.isAnswered) {
          question.isAnswered = true
        }
        collidedQuestion = question;
      }
    });
    return collidedQuestion;
  }

  /**
   * Method to determine whether the player collides with the top, bottom, left or right side of the screen
   *
   * @param canvas canvas of the game
   */
  public collidesWithSide(canvas: HTMLCanvasElement) : void {
    if ( this.yPosition < 0 || this.yPosition + this.image.height > canvas.height ) {
      this.setXPosition(60);
      this.setYPosition(140);
    }
    if (this.xPosition < 0 || this.xPosition + this.image.width > canvas.width ) {
      this.setXPosition(60);
      this.setYPosition(140);
    }
  }
  

  /**
   * Method to determine if the player is colliding with an answer
   *
   * @param answers answers in the game
   * @returns Answer player collided with
   */
  public collidesWithAnswer(answers: Answer[]): Answer {
    let collidedAnswer: Answer;
    this.hasCollidedWithAnswer = false;
    answers.forEach((answer) => {
      if (
        this.getXPosition() < answer.getXPosition() + answer.getImage().width &&
        this.getXPosition() + this.getImage().width > answer.getXPosition() &&
        this.getYPosition() < answer.getYPosition() + answer.getImage().height &&
        this.getYPosition() + this.getImage().height > answer.getYPosition()
      ) {
        this.hasCollidedWithAnswer = true;
        collidedAnswer = answer;
      }
    });
    return collidedAnswer;
  }

  /**
   * Draw the Player on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.canvas = ctx;

    // Draw hearts on the top left corner of the canvas
    for (let i = 0; i < this.getHealth(); i++) {
      ctx.drawImage(this.healthImage, i * 30, 70, 30, 30);
    }
    // write the player to the canvas
    ctx.drawImage(this.image, this.xPosition, this.yPosition,);
    let font = "16px " + localStorage.getItem("playerNameFontFamily");
    // write the player name above player image to the canvas
    ctx.font = font;
    ctx.fillStyle = localStorage.getItem("playerNameColor");
    ctx.fillText(this.name, this.xPosition, this.yPosition,);
  }
}
