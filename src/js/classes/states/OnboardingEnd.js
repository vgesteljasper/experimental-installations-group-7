const SuperState = require('./SuperState.js');

let COUNTDOWN = 4;

module.exports = class OnboardingEnd extends SuperState {
  create() {
    super.create();

    this.createaBackground();
    this.loadSounds();
    this.createFeedback();
    this.setupCountdownText();
    this.goToPlayState();
  }

  createaBackground() {
    this.game.stage.backgroundColor = '#FF780F';
  }

  loadSounds() {
    this.countdown = this.game.add.audio('countdown');
  }

  createFeedback() {
    this.pageTitle = this.add.text(this.world.centerX, 150, 'Perfect!', {
      font: '90px circular-medium',
      fill: '#fff',
    });
    this.pageTitle.anchor.setTo(0.5, 0.5);

    this.ok = this.add.image(this.world.centerX + 210, 140, 'ok');
    this.ok.anchor.setTo(0.5, 0.5);
    this.ok.scale.setTo(0.6, 0.6);

    this.subTitle = this.add.text(this.world.centerX, 300, 'Je bent er helemaal klaar voor', {
      font: '50px circular',
      fill: '#fff',
    });
    this.subTitle.anchor.setTo(0.5, 0.5);

    this.thumbsUp = this.add.image(this.world.centerX + 400, 284, 'thumbsUp');
    this.thumbsUp.angle = 25;
    this.thumbsUp.anchor.setTo(0.5, 0.5);
    this.thumbsUp.scale.setTo(0.6, 0.6);
    this.game.add
      .tween(this.thumbsUp)
      .to({ angle: 0 }, 450, Phaser.Easing.Cubic.EaseOut, true, 600);

    this.onboardingEndImage = this.add.image(this.world.centerX, this.world.centerY, 'onboarding-end-veggies');
    this.onboardingEndImage.anchor.setTo(0.5, 0.5);
    this.onboardingEndImage.scale.setTo(1.1, 1.1);
  }

  goToPlayState() {
    this.time.events.repeat(1000, 0, () => {
      this.time.events.repeat(Phaser.Timer.SECOND, 4, this.handleCountdown, this);
    });
  }

  setupCountdownText() {
    this.countdownText = this.add.text(this.world.centerX, this.world.centerY + 70, '', {
      font: '350px circular-medium',
      fill: '#fff',
    });
    this.countdownText.anchor.setTo(0.5, 0.5);
  }

  handleCountdown() {
    COUNTDOWN -= 1;

    this.countdownText.text = `${COUNTDOWN}`;

    this.countdown.play();

    if (COUNTDOWN <= 0) {
      if (this.countdown) {
        this.countdown.destroy();
      }
      this.state.start('Play');
    }
  }

  shutdown() {
    super.shutdown();

    COUNTDOWN = 4;
  }
};
