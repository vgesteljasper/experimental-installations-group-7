const Button = require('../objects/Button');

module.exports = class Menu extends Phaser.State {
  create() {
    console.log('[Menu] — create()');
    this.createaBackground();
    this.createLogo();
    this.createButton();
  }

  createaBackground() {
    console.log('[Menu] — createaBackground()');
    this.game.stage.backgroundColor = '#FF780F';
  }

  createLogo() {
    console.log('[Menu] — createLogo()');
    this.vegetables = this.add.image(this.world.centerX, this.world.centerY, 'vegetables');
    this.vegetables.anchor.setTo(0.5, 0.5);

    this.knife = this.add.sprite(this.world.centerX + 200, this.world.centerY - 90, 'cutting-animation', 'knife/chop/0001');
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, false);
    this.knife.animations.play('chop', 10, true);

    this.choppedVegetables = this.add.image(this.world.centerX, this.world.centerY, 'choppedVegetables');
    this.choppedVegetables.anchor.setTo(0.5, 0.5);

    // this.choppedVegetables = this.add.image(this.world.centerX, this.world.centerY, 'knife');
    // this.choppedVegetables.anchor.setTo(0.5, 0.5);

    this.logoFill = this.add.image(this.world.centerX, this.world.centerY, 'logoFill');
    this.logoFill.anchor.setTo(0.5, 0.5);

    this.logoBorder = this.add.image(this.world.centerX, this.world.centerY, 'logoBorder');
    this.logoBorder.anchor.setTo(0.5, 0.5);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.buttonPlayClicked, this, 'button', 'Start');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  buttonPlayClicked() {
    console.log('[Menu] — handleStart()');
    this.state.start('Instructions');
  }
};
