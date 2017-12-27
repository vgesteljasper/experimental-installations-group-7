const Button = require('../objects/Button');

module.exports = class Nearby extends Phaser.State {
  create() {
    console.log('[Menu] — create()');
    this.createaBackground();
    this.createLogo();
    this.registerKeys();
  }

  registerKeys() {
    this.chopKey = this.game.input.keyboard.addKey(Phaser.KeyCode.C);
    this.chopKey.onUp.add(this.goToInstructionsState, this);
  }

  createaBackground() {
    console.log('[Nearby] — createaBackground()');
    this.game.stage.backgroundColor = '#FF780F';
  }

  createLogo() {
    console.log('[Nearby] — createLogo()');

    // change position + move to background
    this.logoFill = this.add.image(this.world.centerX, this.world.centerY, 'logoFill');
    this.logoFill.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logoFill).to({ y: 400 }, 250, Phaser.Easing.Cubic.EaseIn, true);

    this.logoBorder = this.add.image(this.world.centerX, this.world.centerY, 'logoBorder');
    this.logoBorder.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logoBorder).to({ y: 400 }, 250, Phaser.Easing.Cubic.EaseIn, true);

    // Tomato
    this.tomato = this.add.image(this.world.centerX - 110, this.world.centerY - 50, 'tomato');
    this.tomato.anchor.setTo(0.5, 0.5);
    this.tomato.scale.setTo(2, 2);
    this.game.add.tween(this.tomato).to({ alpha: 0 }, 150, Phaser.Easing.Cubic.EaseOut, true);

    // Carrot
    this.carrot = this.add.image(this.world.centerX - 230, this.world.centerY, 'carrot');
    this.carrot.anchor.setTo(0.5, 0.5);
    this.carrot.angle = -17;
    this.carrot.scale.setTo(-3, 3);
    this.game.add.tween(this.carrot).to({ alpha: 0 }, 150, Phaser.Easing.Cubic.EaseOut, true);

    // Top half of the cucumber
    this.choppedTopCucumber = this.add.image(
      this.world.centerX + 75,
      this.world.centerY + 18,
      'choppedTopCucumber',
    );
    this.choppedTopCucumber.anchor.setTo(0.5, 0.5);
    this.choppedTopCucumber.scale.setTo(2.5, 2.5);
    this.game.add
      .tween(this.choppedTopCucumber)
      .to({ alpha: 0 }, 150, Phaser.Easing.Cubic.EaseOut, true);

    // Bottom half of the cucumber
    this.choppedBottomCucumber = this.add.image(
      this.world.centerX + 78,
      this.world.centerY + 18,
      'choppedBottomCucumber',
    );
    this.choppedBottomCucumber.anchor.setTo(0.5, 0.5);
    this.choppedBottomCucumber.scale.setTo(2.5, 2.5);
    this.game.add
      .tween(this.choppedBottomCucumber)
      .to({ alpha: 0 }, 150, Phaser.Easing.Cubic.EaseOut, true);

    this.plate = this.add.sprite(
      this.world.centerX + 15,
      this.world.centerY + 55,
      'plate-animation',
      'plate/0001',
    );
    this.plate.anchor.setTo(0.5, 0.5);
    this.plate.animations.add(
      'pressure',
      Phaser.Animation.generateFrameNames('plate/', 1, 5, '', 4),
      2,
      true,
      false,
    );
    this.plate.animations.play('pressure', 10, true);

    this.knife = this.add.sprite(
      this.world.centerX + 200,
      this.world.centerY - 90,
      'cutting-animation',
      'knife/chop/0001',
    );
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add(
      'chop',
      Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4),
      5,
      true,
      false,
    );
    this.knife.animations.play('chop', 10, true);
  }

  goToInstructionsState() {
    console.log('[Nearby] — handleStart()');
    this.state.start('Instructions');
  }
};
