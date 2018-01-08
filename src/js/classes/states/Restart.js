const SuperState = require('./SuperState.js');

let COUNTDOWN = 4;

module.exports = class Restart extends SuperState {
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
    this.pageTitle = this.add.text(this.world.centerX, 150, 'Herkansing!', {
      font: '90px circular-medium',
      fill: '#fff',
    });
    this.pageTitle.anchor.setTo(0.5, 0.5);

    this.ok = this.add.image(this.world.centerX + 290, 140, 'ok');
    this.ok.anchor.setTo(0.5, 0.5);
    this.ok.scale.setTo(0.6, 0.6);

    this.subTitle = this.add.text(this.world.centerX, 300, 'Het spel start over:', {
      font: '50px circular',
      fill: '#fff',
    });
    this.subTitle.anchor.setTo(0.5, 0.5);

    // Tomato
    this.tomato = this.add.image(this.world.centerX - 60, this.world.centerY, 'tomato');
    this.tomato.anchor.setTo(0.5, 0.5);
    this.tomato.scale.setTo(2, 2);

    // Carrot
    this.carrot = this.add.image(this.world.centerX - 180, this.world.centerY + 80, 'carrot');
    this.carrot.anchor.setTo(0.5, 0.5);
    this.carrot.angle = -17;
    this.carrot.scale.setTo(-3, 3);

    this.cumcum = this.add.image(this.world.centerX + 50, this.world.centerY + 80, 'cucumber');
    this.cumcum.anchor.setTo(0.5, 0.5);
    this.cumcum.scale.setTo(2.5, 2.5);
  }

  goToPlayState() {
    this.time.events.repeat(Phaser.Timer.SECOND, 4, this.handleCountdown, this);
  }

  setupCountdownText() {
    this.countdownText = this.add.text(this.world.centerX, this.world.centerY + 35, '', {
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
