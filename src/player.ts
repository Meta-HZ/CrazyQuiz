export default class Player {
    private name: string;

    private health: number;
    
    private score: number;

    private appearanceSource: string;

    public constructor() {
        this.displayPlayer();
    }
    public setName(name: string): void {
        this.name = name;
    }

    private getName(): string {
        return this.name;
    }

    public setAppearanceSource(appearanceSource: string): void {
        this.appearanceSource = appearanceSource;
    }

    private getAppearanceSource(): string {
        return this.appearanceSource;
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

    public displayPlayer() {
        console.log(this.name)
        console.log(this.appearanceSource)
        const newDiv = document.createElement("div");
        newDiv.innerText = this.name;

        const newImg = document.createElement("img");
        newImg.src = this.appearanceSource;

        const parentDiv = document.getElementById("gameMap");
        console.log(parentDiv);
        parentDiv.append(newDiv);
        parentDiv.append(newImg);
    }
}
