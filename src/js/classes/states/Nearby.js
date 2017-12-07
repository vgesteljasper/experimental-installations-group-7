const Button = require('../objects/Button');

module.exports = class Nearby extends Phaser.State {
  create() {
    console.log('[Menu] — create()');
    this.createaBackground();
    this.createLogo();
    this.createButton();
    this.createInstruction();
  }

  createaBackground() {
    console.log('[Menu] — createaBackground()');
    this.game.stage.backgroundColor = '#FF780F';
  }

  createLogo() {
    console.log('[Menu] — createLogo()');

    // change position + move to background
    this.logoFill = this.add.image(this.world.centerX, this.world.centerY, 'logoFill');
    this.logoFill.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logoFill).to({ y: 400 }, 250, Phaser.Easing.Cubic.EaseIn, true);

    this.logoBorder = this.add.image(this.world.centerX, this.world.centerY, 'logoBorder');
    this.logoBorder.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logoBorder).to({ y: 400 }, 250, Phaser.Easing.Cubic.EaseIn, true);

    // fade vegetable
    this.vegetables = this.add.image(this.world.centerX, this.world.centerY, 'vegetables');
    this.vegetables.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.vegetables).to({ alpha: 0 }, 150, Phaser.Easing.Cubic.EaseOut, true);

    // fade vegetable
    this.choppedVegetables = this.add.image(this.world.centerX, this.world.centerY, 'choppedVegetables');
    this.choppedVegetables.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.choppedVegetables)
      .to({ alpha: 0 }, 150, Phaser.Easing.Cubic.EaseOut, true);

    this.plate = this.add.sprite(this.world.centerX + 15, this.world.centerY + 55, 'plate-animation', 'plate/0001');
    this.plate.anchor.setTo(0.5, 0.5);
    this.plate.animations.add('pressure', Phaser.Animation.generateFrameNames('plate/', 1, 5, '', 4), 2, true, false);
    this.plate.animations.play('pressure', 10, true);

    this.knife = this.add.sprite(this.world.centerX + 200, this.world.centerY - 90, 'cutting-animation', 'knife/chop/0001');
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, false);
    this.knife.animations.play('chop', 10, true);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.buttonPlayClicked, this, 'button', 'Start');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);

    // ADD WHEN HAVING ARDUINO
    // this.game.add.tween(buttonPlay)
    //   .to({ y: this.world.height + 150 }, 200, Phaser.Easing.Cubic.EaseOut, true);
  }

  createInstruction() {
    this.instruction = this.add.text(this.world.centerX, this.world.height + 150, 'Sla op de plaat om te beginnen', {
      font: '50px circular',
      fill: '#fff',
    });
    this.instruction.anchor.setTo(0.5, 0.5);

    this.game.add.tween(this.instruction)
      .to({ y: this.world.height - 150 }, 400, Phaser.Easing.Cubic.EaseIn, true);
  }

  buttonPlayClicked() {
    console.log('[Menu] — handleStart()');
    this.state.start('OnboardingEnd');
  }
};
