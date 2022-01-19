import Game from './game.js';
import KeyboardListener from './KeyboardListener.js';

export default class Player {
    public name: string;

    public health: number;
    
    private score: number;

    private xPosition: number;

    private yPosition: number;

    private speed: number;

    private keyBoardListener: KeyboardListener;

    private image: HTMLImageElement;

    public constructor(canvasWidth: number, canvasHeight: number) {
        this.name = localStorage.getItem("playerName");
        this.health = 5;
        this.speed = 4;
        this.image = Game.loadNewImage('/assets/images/steve-front-side.png');
        this.setXPosition(canvasWidth / 2);
        this.setYPosition(canvasHeight / 2);

        this.keyBoardListener = new KeyboardListener();
    }

    public setName(name: string): void {
        this.name = name;
    }

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

    private setHealth(health: number): void {
        this.health = health;
    }

    private getHealth(): number {
        return this.health;
    }

    private setScore(score: number): void {
        this.score = score;
    }

    private getScore(): number {
        return this.score;
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
            this.image = Game.loadNewImage('/assets/images/steve-left-side.png');
        }
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
            this.xPosition = this.xPosition + this.speed;
            this.image = Game.loadNewImage('/assets/images/steve-right-side.png');
        }
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPosition = this.yPosition - this.speed;
            this.image = Game.loadNewImage('/assets/images/steve-back-side.png');
        }
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
            this.yPosition = this.yPosition + this.speed;
            this.image = Game.loadNewImage('/assets/images/steve-front-side.png');
        }
    }

    /**
     * Draw the Player on the canvas
     *
     * @param ctx rendering context
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        // write the player to the canvas
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
        let font = '16px ' + localStorage.getItem("playerNameFontFamily");
        // write the player name above player image to the canvas
        ctx.font = font 
        ctx.fillStyle = localStorage.getItem("playerNameColor")
        ctx.fillText(this.name, this.xPosition - 0, this.yPosition - 10);
    }
} 
