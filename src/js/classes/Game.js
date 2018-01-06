const Boot = require('./states/Boot');
const Preload = require('./states/Preload');
const Menu = require('./states/Menu');
const Nearby = require('./states/Nearby');
const OnboardingEnd = require('./states/OnboardingEnd');
const Instructions = require('./states/Instructions');
const Leaderboard = require('./states/Leaderboard');
const Play = require('./states/Play');
const Restart = require('./states/Restart');
const End = require('./states/End');

module.exports = class Game extends Phaser.Game {
  constructor() {
    super(1920, 1080, Phaser.AUTO);

    this.registerGameStates();
    this.startGame();
  }

  registerGameStates() {
    this.state.add('Boot', Boot);
    this.state.add('Preload', Preload);
    this.state.add('Menu', Menu);
    this.state.add('Nearby', Nearby);
    this.state.add('OnboardingEnd', OnboardingEnd);
    this.state.add('Instructions', Instructions);
    this.state.add('Leaderboard', Leaderboard);
    this.state.add('Play', Play);
    this.state.add('Restart', Restart);
    this.state.add('End', End);
  }

  startGame() {
    this.state.start('Boot');
  }
};
