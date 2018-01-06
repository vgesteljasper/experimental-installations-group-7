module.exports = class ChoppedIndicator extends Phaser.Graphics {
  constructor(game, index, veggieGutter, PROGRESS_START) {
    super(game);

    this.indicator = this.game.add.graphics(0, 0);
    this.indicator.beginFill(0xededed, 1);
    this.indicator.lineStyle(2, 0xff0000, 1);
    /* prettier-ignore */
    this.indicator.drawCircle(PROGRESS_START + (index * veggieGutter), 65, 50);
  }
};
