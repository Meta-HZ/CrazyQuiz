import Player from "./player.js";
import Question from "./question.js";
import Answer from "./answer.js";
import Scoreboard from "./scoreboard.js";

/* Interface need for fetching data and mapping it from question.json file */
export interface QuestionData {
  question: string;
  answered: boolean;
  answer: string;
  answers: string[];
}

export default class Game {
  private player: Player;

  private scoreboard: Scoreboard;

  private questions: Question[];

  private answers: Answer[];

  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  /* Needed for mapping json questions.json file*/
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

    this.player = new Player();

    this.questions = [];

    this.answers = [];

    this.getRandomQuestions()

    this.scoreboard = new Scoreboard();
    this.scoreboard.setScore(this.player.name, 0);

    // Get scores from the database
    this.scoreboard.getScores();
    this.loop();
  }

  /**
   * Method to get a random number
   */
  private getNumber = (function () {
    var previous = NaN;
    return function () {
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

  /**
   * Method to get the questions from the json files
   *
   * @returns the questions json
   */
  private async getQuestions(): Promise<QuestionData[]> {
    const res = await fetch("questions.json");
    const res_1 = await res.json();
    return res_1 as QuestionData[];
  }

  /**
   * Method to get random question from the json file
   */
  private getRandomQuestions() {
    this.getQuestions().then((response: QuestionData[]) => {
      this.questionsJson = response;
      for (let i = 0; i < this.questionsJson.length; i++) {
        let randomNumber = this.getNumber();

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
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.player.draw(this.ctx);
    this.scoreboard.draw();

    if (this.questions.length !== 0) {
      let count = 0;
      // draw each question item
      this.questions.forEach((question) => {
        if (question.isAnswered) {
        } else {
          if (count < 4) {
            question.drawQuestion(this.ctx);
          }
          count++
        }
      });
      count = 0
    }

    if (this.answers.length !== 0) {
      // draw each question item
      this.answers.forEach((answer) => {
        answer.drawAnswer(this.ctx);
      });
    }
  }

  /**
   * Method to move the player
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
    this.player.collidesWithSide(this.canvas)
    let question: Question = this.player.collidesWithBlock(this.questions);
    let answer: Answer = this.player.collidesWithAnswer(this.answers);

    // check if player has any hearts left
    if (this.player.health === 0) {
      window.location.href = "death.html"
    }
    // check if player has collised with an answer
    if(this.player.hasCollidedWithAnswer) {
      // Check if the answer the player collided with is correct
      if(answer.isCorrect) {
        this.answers = [];
        this.getRandomQuestions()
        this.scoreboard.increaseScore(this.player.name);
      } else {
        this.answers = [];
        this.getRandomQuestions()
        this.player.health -= 1;
      }
    }
    // check if player has collised with a question
    if(this.player.hasCollidedWithQuestion) {
      this.questions = [];
      for (let i = 0; i < question.answers.length; i++) {
        let isCorrect: boolean;
        // Mark question as correct
        if(question.answers[i] === question.answer) {
          isCorrect = true
        }else {
          isCorrect = false
        }
        this.answers.push(
          new Answer(
            this.canvas.width,
            question.answers[i],
            isCorrect,
            question.question
          )
        );
      }
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
