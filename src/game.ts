import Player from './Player.js';
import Question from './question.js';
import Scoreboard from './scoreboard.js';

export default class Game {

  private player: Player;

  private scoreboard: Scoreboard;

  private questions: Question[];

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  /**
   * Initialize the Game class
   *
   * @param canvasId id of the canvas
   */
  public constructor(canvasId: HTMLCanvasElement) {
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.player = new Player(this.canvas.width, this.canvas.height);

    this.questions = [];

    for (let i = 0; i < 3; i++) {
      this.questions.push(
        new Question(this.canvas.width),
      );
    }

    this.scoreboard = new Scoreboard();

    // // Get scores from the database
    this.scoreboard.getScores();
    this.loop();
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.scoreboard.draw();

    if (this.questions.length !== 0) {
      // draw each scoring item
      this.questions.forEach((question) => {
        question.draw(this.ctx);
      });
    }
  }

  /**
   * Method to move the scoring items
   */
  private move(): void {
    this.player.move();
  }

  /**
   * Method for the Game Loop
   */
  private loop = (): void => {
    this.move();
    this.draw();
    requestAnimationFrame(this.loop);
  };

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
