module.exports = class Nearby extends Phaser.State {
  create() {
    this.createaBackground();
    this.loadSounds();
    this.createLogo();
    this.registerActionTriggers();
    this.createInstructions();
  }

  registerActionTriggers() {
    this.game.input.keyboard.addKey(Phaser.KeyCode.D).onUp.add(this.goToInstructionsState, this);

    this.goToInstructionsState = this.goToInstructionsState.bind(this);
    Arduino.addEventListener('drum-hit', this.goToInstructionsState);
  }

  createaBackground() {
    this.game.stage.backgroundColor = '#FF780F';
  }

  loadSounds() {
    this.chop = this.game.add.audio('chop');
  }

  createLogo() {
    // Tomato
    this.tomato = this.add.image(this.world.centerX - 110, this.world.centerY - 50, 'tomato');
    this.tomato.anchor.setTo(0.5, 0.5);
    this.tomato.scale.setTo(2, 2);
    this.game.add.tween(this.tomato)
      .to({ alpha: 0.25, y: 350 }, 250, Phaser.Easing.Cubic.EaseOut, true);

    // Carrot
    this.carrot = this.add.image(this.world.centerX - 230, this.world.centerY, 'carrot');
    this.carrot.anchor.setTo(0.5, 0.5);
    this.carrot.angle = -17;
    this.carrot.scale.setTo(-3, 3);
    this.game.add.tween(this.carrot)
      .to({ alpha: 0.25, y: 400 }, 250, Phaser.Easing.Cubic.EaseOut, true);

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
      .to({ alpha: 0.25, y: 400 }, 250, Phaser.Easing.Cubic.EaseOut, true);

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
      .to({ alpha: 0.25, y: 400 }, 250, Phaser.Easing.Cubic.EaseOut, true);

    // change position + move to background
    this.logoFill = this.add.image(this.world.centerX, this.world.centerY, 'logoFill');
    this.logoFill.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logoFill).to({ y: 400 }, 250, Phaser.Easing.Cubic.EaseIn, true);

    this.logoBorder = this.add.image(this.world.centerX, this.world.centerY, 'logoBorder');
    this.logoBorder.anchor.setTo(0.5, 0.5);
    this.game.add.tween(this.logoBorder).to({ y: 400 }, 250, Phaser.Easing.Cubic.EaseIn, true);

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

  createInstructions() {
    this.instruction = this.add.text(
      this.world.centerX,
      this.world.height - 150,
      '   op de       ',
      {
        font: '50px circular',
        fill: '#fff',
      },
    );
    this.instruction.anchor.setTo(0.5, 0.5);

    this.knifeNearby = this.add.sprite(
      this.world.centerX - 190,
      this.world.height - 180,
      'cutting-animation',
      'knife/chop/0001',
    );
    this.knifeNearby.anchor.setTo(0.5, 0.5);
    this.knifeNearby.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, false);
    this.knifeNearby.scale.setTo(0.3, 0.3);
    this.knifeNearby.animations.play('chop', 10, true);

    this.plateNearby = this.add.sprite(
      this.world.centerX + 115,
      this.world.height - 150,
      'plate-animation',
      'plate/0001',
    );
    this.plateNearby.anchor.setTo(0.5, 0.5);
    this.plateNearby.scale.setTo(0.3, 0.3);
  }

  goToInstructionsState() {
    this.chop.play();
    this.state.start('Instructions');
  }

  shutdown() {
    Arduino.removeEventListener('drum-hit', this.goToInstructionsState);
  }
};
