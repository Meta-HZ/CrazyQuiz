import Game from './game.js';

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',  () => new Game(<HTMLCanvasElement>document.getElementById('canvas')))
