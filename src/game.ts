import Player from './Player.js';

export default class Game {
  private player: Player;


  /**
   * Initialize the Game class
   *
   * @param canvasId id of the canvas
   */
  public constructor() {
    this.player = new Player();

    this.displayPlayer()
    this.loop();
  }

  private displayPlayer() {
    let playerNameElement = document.getElementById("playerName")
    playerNameElement.innerHTML = this.player.name
  }
  
  /**
   * Method for the Game Loop
   */
  private loop = (): void => {
    requestAnimationFrame(this.loop);
  };

}
