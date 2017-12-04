import Boot from './states/Boot';
import Preload from './states/Preload';
import Menu from './states/Menu';
import Leaderboard from './states/Leaderboard';
import Play from './states/Play';
import End from './states/End';

export default class Game extends Phaser.Game {
  constructor() {
    super(1050, 750, Phaser.AUTO, `content`);
    this.state.add(`Boot`, Boot);
    this.state.add(`Preload`, Preload);
    this.state.add(`Menu`, Menu);
    this.state.add(`Leaderboard`, Leaderboard);
    this.state.add(`Play`, Play);
    this.state.add(`End`, End);
    this.state.start(`Boot`);
  }
}
