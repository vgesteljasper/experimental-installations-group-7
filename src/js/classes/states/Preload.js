export default class Preload extends Phaser.State {
  init() {
    this.asset = this.add.sprite(this.world.centerX, this.world.centerY, `preloader`);
    this.asset.anchor.setTo(0.5, 0.5);
  }
  preload() {
    console.log(`[Preload] — preload()`);
    // preload all assets for in the game
    this.load.image(`title`, `assets/img/logo.png`);
  }
  create() {
    this.state.start(`Menu`);
  }
}
