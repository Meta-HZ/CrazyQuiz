export interface QuestionData {
  question: string
  answered: boolean
  answer: string
  answers: string[]
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

  private questionsJson: { 
    question: string; 
    answered: boolean; 
    answer: string;
    answers: string[];
  }[] = [];

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

    this.getQuestions().then((response: QuestionData[]) => {
      this.questionsJson = response;
      for (let i = 0; i < 3; i++) {
        
        let randomNumber = this.getNumber()

        this.questions.push(
          new Question(
            this.canvas.width,
            this.questionsJson[randomNumber].question,
            this.questionsJson[randomNumber].answered,
            this.questionsJson[randomNumber].answer,
            this.questionsJson[randomNumber].answers
          )
        );
      }
    });



    this.scoreboard = new Scoreboard();

    // Get scores from the database
    this.scoreboard.getScores();
    this.loop();
  }


  // getNumber generates a different random number in the inclusive range [0, 4]
  private getNumber = (function() {
    var previous = NaN;
    return function() {
      var min = 0;
      var max = 5 + (!isNaN(previous) ? -1 : 0);
      var value = Math.floor(Math.random() * (max - min + 1)) + min;
      if (value >= previous) {
        value += 1;
      }
      previous = value;
      return value;
    };
  })();


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
        question.drawQuestion(this.ctx);
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
    let collides = this.player.collidesWithBlock(this.questions);

    if (collides) {
      this.questions = []
    }
    
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
