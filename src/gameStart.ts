import Game from './Game.js';
import Player from './player.js';

console.log('Javascript is working!');

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load',  () => new Game())
