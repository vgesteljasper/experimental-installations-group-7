module.exports = class Preload extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#FF780F';

    this.loader = this.add.sprite(this.world.centerX, this.world.centerY, 'preloader');
    this.loader.anchor.setTo(0.5, 0.5);
  }
  preload() {
    console.log('[Preload] — preload()');
    // preload all game assets
    this.load.image('logoFill', 'assets/img/logo-fill-05.png');
    this.load.image('logoBorder', 'assets/img/logo-border-05.png');
    this.load.image('vegetables', 'assets/img/vegetables-05.png');
    this.load.image('choppedVegetables', 'assets/img/chopped-vegetables-05.png');
    this.load.image('knife', 'assets/img/knife-05.png');
    this.load.image('kitchenBackground', 'assets/img/kitchen-background-03.jpg');
    this.load.image('spaghetti', 'assets/img/spaghetti.jpg');

    this.load.atlasJSONHash('button-comp', 'assets/img/components/button-comp.png', 'assets/img/components/button-comp.json');
    this.load.atlasJSONHash('cutting-animation', 'assets/img/components/cutting-animation.png', 'assets/img/components/cutting-animation.json');
  }
  create() {
    this.state.start('Menu');
  }
};
