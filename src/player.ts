export default class Player {
    public name: string;

    public health: number;
    
    private score: number;

    private appearanceSource: string;

    public constructor() {
        this.name = localStorage.getItem("playerName");
        this.health = 5;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getName(): string {
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
}
