export default class Preload extends Phaser.State {
  init() {
    this.loader = this.add.sprite(this.world.centerX, this.world.centerY, `preloader`);
    this.loader.anchor.setTo(0.5, 0.5);
  }
  preload() {
    console.log(`[Preload] — preload()`);
    // preload all game assets
    this.load.image(`logo`, `assets/img/logo-02.png`);
    this.load.image(`background`, `assets/img/background-01.jpg`);
    this.load.image(`kitchenBackground`, `assets/img/kitchen-background-03.jpg`);
    this.load.image(`spaghetti`, `assets/img/spaghetti.jpg`);
    this.load.image(`chef`, `assets/img/chef-01.png`);

    this.load.atlasJSONHash(`button-comp`, `assets/img/components/button-comp.png`, `assets/img/components/button-comp.json`);
  }
  create() {
    this.state.start(`Play`);
  }
}
