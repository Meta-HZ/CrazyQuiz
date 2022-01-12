export default class Player {
    name;
    health;
    score;
    appearanceSource;
    constructor() {
        this.displayPlayer();
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setAppearanceSource(appearanceSource) {
        this.appearanceSource = appearanceSource;
    }
    getAppearanceSource() {
        return this.appearanceSource;
    }
    setHealth(health) {
        this.health = health;
    }
    getHealth() {
        return this.health;
    }
    setScore(score) {
        this.score = score;
    }
    getScore() {
        return this.score;
    }
    displayPlayer() {
        console.log(this.name);
        console.log(this.appearanceSource);
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
//# sourceMappingURL=player.js.map