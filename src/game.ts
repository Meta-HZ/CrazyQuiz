export interface QuestionData {
  question: string
  answered: boolean
  answers: string[]
  answerId: number

}

import Player from "./Player.js";
import Question from "./question.js";
import Scoreboard from "./scoreboard.js";

export default class Game {
  private player: Player;

  private scoreboard: Scoreboard;

  private questions: Question[];

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private questionsJson: { question: string; answered: boolean; answers: string[]; answerId: number }[] = [];
  private answersJson: string[];

  /**
   * Initialize the Game class
   *
   * @param canvasId id of the canvas
   */
  public constructor(canvasId: HTMLCanvasElement) {
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");

    this.player = new Player(this.canvas.width, this.canvas.height);

    this.questions = [];

    // const res = await fetch("questions.json").then((response) => response.json());
    this.getQuestions().then((response: QuestionData[]) => {
      this.questionsJson = response;
      console.log(this.questionsJson[1]);
    });

    // getScores().then((res: Score[]) => {
    //   // sort the scores in descending order
    //   res.sort((a, b) => b.score - a.score);
    //   this.scores = res;
    // });

    for (let i = 0; i < 3; i++) {
      this.questions.push(
        new Question(
          this.canvas.width,
          this.questionsJson[1].question,
          this.answersJson
        )
      );
    }

    this.scoreboard = new Scoreboard();

    // Get scores from the database
    this.scoreboard.getScores();
    this.loop();
  }

  private async getQuestions(): Promise<QuestionData[]> {
    const res = await fetch("questions.json")
    const res_1 = await res.json();
    return res_1 as QuestionData[]
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.scoreboard.draw();

    if (this.questions.length !== 0) {
      // draw each question item
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
