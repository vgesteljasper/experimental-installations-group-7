const Arduino = require('./classes/Arduino.js');
const Game = require('./classes/Game.js');

const arduino = new Arduino();
new Game(arduino);
