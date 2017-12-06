const Boot = require('./states/Boot');
const Preload = require('./states/Preload');
const Menu = require('./states/Menu');
const Instructions = require('./states/Instructions');
const Leaderboard = require('./states/Leaderboard');
const Play = require('./states/Play');
const End = require('./states/End');

module.exports = class Game extends Phaser.Game {
  constructor() {
    super(1920, 1080, Phaser.AUTO);
    this.state.add('Boot', Boot);
    this.state.add('Preload', Preload);
    this.state.add('Menu', Menu);
    this.state.add('Instructions', Instructions);
    this.state.add('Leaderboard', Leaderboard);
    this.state.add('Play', Play);
    this.state.add('End', End);
    this.state.start('Boot');
  }
};
