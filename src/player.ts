import Game from "./game.js";
import KeyboardListener from "./KeyboardListener.js";
import Question from "./question.js";

export default class Player {
  public name: string;

  public health: number;

  public hasCollided: boolean = false;

  private xPosition: number;

  private yPosition: number;

  private speed: number;

  private keyBoardListener: KeyboardListener;

  private image: HTMLImageElement;

  private healthImage: HTMLImageElement;

  private canvas: CanvasRenderingContext2D;

  public constructor(canvasWidth: number, canvasHeight: number) {
    this.name = localStorage.getItem("playerName");
    this.health = 3;
    this.hasCollided = false
    this.speed = 4;
    this.image = Game.loadNewImage("/assets/images/steve-front-side.png");
    this.healthImage = Game.loadNewImage("/assets/images/heart.png");
    this.xPosition = canvasWidth / 4
    this.yPosition = canvasHeight / 4

    this.keyBoardListener = new KeyboardListener();
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
   * Method to determine of the HZ bird is colliding with a block
   *
   * @param blocks blocks in the game
   * @returns true or false
   */
  public collidesWithBlock(questions: Question[]): Question {
    let collidedQuestion: Question;
    this.hasCollided = false;
    questions.forEach((question) => {
      if (this.xPosition < question.getXPosition() + question.getImage().width
          && this.xPosition + this.image.width > question.getXPosition() 
          && this.yPosition < question.getYPosition() + question.getImage().height 
          && this.yPosition + this.image.height > question.getYPosition()
      ) {
        console.log("Collision with block!");
        this.hasCollided = true;
        collidedQuestion = question;
      }
      console.log(this.hasCollided)
    });
    return collidedQuestion;
  }

  /**
   * Draw the Player on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.canvas = ctx;

    // Draw hearts on the top left corner of the canvas
    for (let i = 0; i < this.health; i++) {
      ctx.drawImage(this.healthImage, i * 30, 70, 30, 30);
    }
    // write the player to the canvas
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
    let font = "16px " + localStorage.getItem("playerNameFontFamily");
    // write the player name above player image to the canvas
    ctx.font = font;
    ctx.fillStyle = localStorage.getItem("playerNameColor");
    ctx.fillText(this.name, this.xPosition - 0, this.yPosition - 10);
  }
}
