export default class Menu extends Phaser.State {
  create() {
    console.log(`[Menu] — create()`);
    this.createLogo();
  }

  createLogo() {
    this.logo = this.add.image(this.world.centerX, 270, `logo`);
    this.logo.anchor.setTo(0.5, 0.5);
  }

  handleStart() {
    console.log(`[Menu] — handleStart()`);
    this.state.start(`Game`);
  }
}
