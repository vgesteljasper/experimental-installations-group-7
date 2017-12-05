import Button from '../objects/Button';

export default class Menu extends Phaser.State {
  create() {
    console.log(`[Menu] — create()`);
    this.createaBackground();
    this.createLogo();
    this.createDishSelection();
    this.createButton();
  }

  createaBackground() {
    console.log(`[Menu] — createLogo()`);
    this.background = this.add.image(0, 0, `background`);
  }

  createLogo() {
    console.log(`[Menu] — createLogo()`);
    this.logo = this.add.image(this.world.centerX, 270, `logo`);
    this.logo.anchor.setTo(0.5, 0.5);
  }

  createDishSelection() {
    this.dishText = this.add.text(this.world.centerX, this.world.centerY + 50, `Kies een gerecht`, {font: `50px circular`, fill: `#fff`});
    this.dishText.anchor.setTo(0.5, 0.5);

    // left dish
    this.dishCircle = this.game.add.graphics(0,0);
    this.dishCircle.beginFill(0xffaa71, 1);
    this.dishCircle.drawCircle(this.world.centerX - 200, this.world.centerY + 190, 144);

    // right dish
    this.dishCircle = this.game.add.graphics(0,0);
    this.dishCircle.beginFill(0xffaa71, 1);
    this.dishCircle.drawCircle(this.world.centerX + 200, this.world.centerY + 190, 144);

    //cirlce-active
    this.dishCircle = this.game.add.graphics(0,0);
    this.dishCircle.beginFill(0xffaa71, 1);
    this.dishCircle.lineStyle(10, 0xFFFFFF, 1);
    this.dishCircle.drawCircle(this.world.centerX, this.world.centerY + 190, 144);

    //img
    this.spaghetti = this.add.image(this.world.centerX, this.world.centerY + 185, `spaghetti`);
    this.spaghetti.anchor.setTo(0.5, 0.5);

    //mask
    this.mask = this.game.add.graphics(0, 0);
    this.mask.beginFill(0xffffff);
    this.mask.drawCircle(this.world.centerX, this.world.centerY + 190, 144);
    this.spaghetti.mask = this.mask;

  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.buttonPlayClicked, this, `button`, `Start`);
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  handleStart() {
    console.log(`[Menu] — handleStart()`);
    this.state.start(`Game`);
  }
}
