module.exports = class Menu extends Phaser.State {
  create() {
    this.createaBackground();
    this.loadSounds();
    this.createLogo();
    this.createInstructions();
    this.registerActionTriggers();
  }

  registerActionTriggers() {
    this.game.input.keyboard.addKey(Phaser.KeyCode.P).onUp.add(this.goToNearbyState, this);

    this.goToNearbyState = this.goToNearbyState.bind(this);
    Arduino.addEventListener('pressure-plate-change', this.goToNearbyState);
  }

  createaBackground() {
    this.game.stage.backgroundColor = '#FF780F';
  }

  loadSounds() {
    this.click = this.game.add.audio('slider');
    this.click.volume = 2;
  }

  createLogo() {
    // Tomato
    this.tomato = this.add.image(this.world.centerX - 110, this.world.centerY - 50, 'tomato');
    this.tomato.anchor.setTo(0.5, 0.5);
    this.tomato.scale.setTo(2, 2);

    // Carrot
    this.carrot = this.add.image(this.world.centerX - 230, this.world.centerY, 'carrot');
    this.carrot.anchor.setTo(0.5, 0.5);
    this.carrot.angle = -17;
    this.carrot.scale.setTo(-3, 3);

    // Top half of the cucumber
    this.choppedTopCucumber = this.add.image(
      this.world.centerX + 75,
      this.world.centerY + 18,
      'choppedTopCucumber',
    );
    this.choppedTopCucumber.anchor.setTo(0.5, 0.5);
    this.choppedTopCucumber.scale.setTo(2.5, 2.5);

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

    // Bottom half of the cucumber
    this.choppedBottomCucumber = this.add.image(
      this.world.centerX + 78,
      this.world.centerY + 18,
      'choppedBottomCucumber',
    );
    this.choppedBottomCucumber.anchor.setTo(0.5, 0.5);
    this.choppedBottomCucumber.scale.setTo(2.5, 2.5);

    this.logoFill = this.add.image(this.world.centerX, this.world.centerY, 'logoFill');
    this.logoFill.anchor.setTo(0.5, 0.5);

    this.logoBorder = this.add.image(this.world.centerX, this.world.centerY, 'logoBorder');
    this.logoBorder.anchor.setTo(0.5, 0.5);
  }

  createInstructions() {
    this.instruction = this.add.text(
      this.world.centerX,
      this.world.height - 150,
      'Sta op de        om te beginnen',
      {
        font: '50px circular',
        fill: '#fff',
      },
    );
    this.instruction.anchor.setTo(0.5, 0.5);

    this.pressurePlate = this.add.image(this.world.centerX - 67, this.world.height - 150, 'pressure-plate');
    this.pressurePlate.anchor.setTo(0.5, 0.5);
    this.pressurePlate.scale.setTo(0.1, 0.1);
  }

  goToNearbyState(e) {
    if (!e.detail || e.detail.active) {
      this.state.start('Nearby');
      this.click.play();
    }
  }

  shutdown() {
    Arduino.removeEventListener('pressure-plate-change', this.goToNearbyState);
  }
};
