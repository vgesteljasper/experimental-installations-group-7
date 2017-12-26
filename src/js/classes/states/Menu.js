const Button = require('../objects/Button');

module.exports = class Menu extends Phaser.State {
  create() {
    console.log('[Menu] — create()');
    this.createaBackground();
    this.createLogo();
    this.createButton();
    this.createInstructions();
  }

  createaBackground() {
    console.log('[Menu] — createaBackground()');
    this.game.stage.backgroundColor = '#FF780F';
  }

  createLogo() {
    console.log('[Menu] — createLogo()');

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

  createButton() {
    const buttonPlay = new Button(
      this.game,
      this.world.centerX,
      this.world.height - 150,
      this.buttonPlayClicked,
      this,
      'button',
      'Start',
    );
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  createInstructions() {
    this.instruction = this.add.text(
      this.world.centerX,
      this.world.height - 150,
      'Sta op de plaat om te beginnen',
      {
        font: '50px circular',
        fill: '#fff',
      },
    );
    this.instruction.anchor.setTo(0.5, 0.5);

    // => yPOS of this.instruction ~> this.world.height + 150
    // ADD WHEN HAVING ARDUINO
    // this.game.add.tween(this.instruction)
    //   .to({ y: this.world.height - 150 }, 400, Phaser.Easing.Cubic.EaseIn, true);
  }

  buttonPlayClicked() {
    console.log('[Menu] — handleStart()');
    this.state.start('Nearby');
  }
};
