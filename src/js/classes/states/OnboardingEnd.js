const Button = require('../objects/Button');

module.exports = class OnboardingEnd extends Phaser.State {
  create() {
    console.log('[Menu] — create()');
    this.createaBackground();
    this.createFeedback();
    this.createButton();
  }

  createaBackground() {
    console.log('[Menu] — createaBackground()');
    this.game.stage.backgroundColor = '#FF780F';
  }

  createFeedback() {
    this.pageTitle = this.add.text(this.world.centerX, 150, 'Perfect!', { font: '90px circular-medium', fill: '#fff' });
    this.pageTitle.anchor.setTo(0.5, 0.5);

    this.ok = this.add.image(this.world.centerX + 210, 140, 'ok');
    this.ok.anchor.setTo(0.5, 0.5);
    this.ok.scale.setTo(0.6, 0.6);

    this.subTitle = this.add.text(this.world.centerX, 300, 'Je bent er helemaal klaar voor', { font: '50px circular', fill: '#fff' });
    this.subTitle.anchor.setTo(0.5, 0.5);

    this.thumbsUp = this.add.image(this.world.centerX + 400, 284, 'thumbsUp');
    this.thumbsUp.angle = 25;
    this.thumbsUp.anchor.setTo(0.5, 0.5);
    this.thumbsUp.scale.setTo(0.6, 0.6);
    this.game.add.tween(this.thumbsUp)
      .to({ angle: 0 }, 450, Phaser.Easing.Cubic.EaseOut, true, 400);

    this.cumcum = this.add.image(this.world.centerX, this.world.centerY + 80, 'cucumber');
    this.cumcum.anchor.setTo(0.5, 0.5);
    this.cumcum.scale.setTo(2.5, 2.5);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.buttonPlayClicked, this, 'button', 'Start');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  buttonPlayClicked() {
    console.log('[OnboardingEnd] — handleStart()');
    this.state.start('Play');
  }
};
