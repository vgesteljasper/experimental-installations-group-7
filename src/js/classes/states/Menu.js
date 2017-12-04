export default class Menu extends Phaser.State {
  create() {
    console.log(`[Menu] — create()`);
  }
  handleStart() {
    console.log(`[Menu] — handleStart()`);
    this.state.start(`Game`);
  }
}
