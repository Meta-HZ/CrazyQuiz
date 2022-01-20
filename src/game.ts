import Player from './Player.js';
import Scoreboard from './scoreboard.js';

export default class Game {

  private player: Player;

  private scoreboard: Scoreboard;

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
    this.scoreboard = new Scoreboard();

    // Add score to the database
    this.scoreboard.setScore("Daan", 11)
    // Get scores from the database
    this.scoreboard.getScores();
    this.loop();
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.scoreboard.draw(this.ctx);


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
