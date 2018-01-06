module.exports = class End extends Phaser.State {
  create() {
    this.createaBackground();
    this.createScore();
    this.registerActionTriggers();
    this.setupButtons();
  }

  registerActionTriggers() {
    this.time.events.repeat(2500, 0, () => {
      this.game.input.keyboard.addKey(Phaser.KeyCode.D).onUp.add(this.goToRestartState, this);

      this.goToRestartState = this.goToRestartState.bind(this);
      Arduino.addEventListener('drum-hit', this.goToRestartState);
    });
  }

  createaBackground() {
    this.game.stage.backgroundColor = '#FF780F';
  }

  createScore() {
    this.medal = this.add.image(this.world.centerX, -420, 'medal');
    this.medal.anchor.setTo(0.5, 0.5);
    this.medal.scale.setTo(0.7, 0.7);
    this.game.add.tween(this.medal).to({ y: 350 }, 400, Phaser.Easing.Cubic.EaseIn, true);

    this.pageTitleShadow = this.add.text(this.world.centerX - 245, 85, 'Proficiat!', {
      font: '120px circular-medium',
      fill: '#fff',
    });
    this.pageTitleShadow.tint = 0x000000;
    this.pageTitleShadow.alpha = 0.6;

    this.pageTitle = this.add.text(this.world.centerX, 150, 'Proficiat!', {
      font: '120px circular-medium',
      fill: '#fff',
    });
    this.pageTitle.anchor.setTo(0.5, 0.5);

    const timePlayed = localStorage.getItem('timePlayed');

    const SCORE = timePlayed;

    this.score = this.add.text(this.world.centerX, this.world.centerY + 25, `${SCORE}`, {
      font: '160px circular-medium',
      fill: '#fff',
    });
    this.score.anchor.setTo(0.5, 0.5);
    this.score.alpha = 0;
    this.game.add.tween(this.score).to({ alpha: 1 }, 400, Phaser.Easing.Cubic.EaseIn, true, 400);
  }

  goToMenuState() {
    this.state.start('Menu');
  }

  setupButtons() {
    this.instruction = this.add.text(
      this.world.centerX,
      this.world.height - 150,
      '            op de           om te herstarten',
      {
        font: '50px circular',
        fill: '#fff',
      },
    );
    this.instruction.anchor.setTo(0.5, 0.5);

    this.knifeNearby = this.add.sprite(
      this.world.centerX - 330,
      this.world.height - 180,
      'cutting-animation',
      'knife/chop/0001',
    );
    this.knifeNearby.anchor.setTo(0.5, 0.5);
    this.knifeNearby.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, false);
    this.knifeNearby.scale.setTo(0.3, 0.3);
    this.knifeNearby.animations.play('chop', 10, true);

    this.plateNearby = this.add.sprite(
      this.world.centerX - 48,
      this.world.height - 150,
      'plate-animation',
      'plate/0001',
    );
    this.plateNearby.anchor.setTo(0.5, 0.5);
    this.plateNearby.scale.setTo(0.3, 0.3);
  }

  goToRestartState() {
    this.state.start('Restart');
  }

  shutdown() {
    Arduino.removeEventListener('drum-hit', this.goToRestartState);
  }
};
