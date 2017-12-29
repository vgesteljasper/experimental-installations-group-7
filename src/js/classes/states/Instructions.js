let TOTAL_CHOP_COUNT;
let COUNTER = 1;

module.exports = class Instructions extends Phaser.State {
  init() {
    this.gameEnded = false;
  }

  create() {
    this.loadSounds();
    this.createaBackground();
    this.createInstructions();
    this.setupVegetableToChop('cucumber');
    this.createChoppingAnimation();
    this.registerActionTriggers();
  }

  registerActionTriggers() {
    this.game.input.keyboard.addKey(Phaser.KeyCode.D).onUp.add(this.playChopAnimation, this);

    this.playChopAnimation = this.playChopAnimation.bind(this);
    Arduino.addEventListener('drum-hit', this.playChopAnimation);
  }

  loadSounds() {
    this.chop = this.game.add.audio('chop');
  }

  createaBackground() {
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }

  createInstructions() {
    /* INSTEAD OF TEXT */

    // this.iconBackground = this.game.add.graphics(0, 0);
    // this.iconBackground.lineStyle(5, 0xFF0000, 0.5);
    // // this.iconBackground.beginFill(0xFF780F, 1);
    // this.iconBackground.drawRect(this.world.centerX - 125, 180, 250, 150);
    // this.iconBackground.endFill();
    // this.iconBackground.anchor.setTo(0.5, 0.5);

    this.plate = this.add.sprite(
      this.world.centerX,
      280,
      'plate-animation',
      'plate/0001',
    );
    this.plate.anchor.setTo(0.5, 0.5);
    this.plate.animations.add('pressure', Phaser.Animation.generateFrameNames('plate/', 1, 5, '', 4), 2, true, false);
    this.plate.scale.setTo(0.3, 0.3);
    this.plate.animations.play('pressure', 10, true);

    this.knife = this.add.sprite(
      this.world.centerX + 60,
      200,
      'cutting-animation',
      'knife/chop/0001',
    );
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, false);
    this.knife.scale.setTo(0.4, 0.4);
    this.knife.animations.play('chop', 10, true);


    this.lever = this.add.sprite(
      this.world.centerX,
      230,
      'lever-animation',
      'lever/0001',
    );
    this.lever.anchor.setTo(0.5, 0.5);
    this.lever.animations.add('lever', Phaser.Animation.generateFrameNames('lever/', 1, 5, '', 4), 2, true, false);
    this.lever.scale.setTo(0.4, 0.4);
    this.lever.animations.play('lever', 2, true);
  }

  setupVegetableToChop(veggie) {
    this.cucumberChop = this.add.sprite(
      this.world.centerX,
      this.world.centerY + 300,
      `${veggie}-cutting-animation`,
      `${veggie}/chop/000${COUNTER}`,
    );
    this.cucumberChop.anchor.setTo(0.5, 0.5);
  }

  createChoppingAnimation() {
    this.knife = this.add.sprite(
      this.world.centerX + 200,
      this.world.centerY + 90,
      'cutting-animation',
      'knife/chop/0001',
    );
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add(
      'chop',
      Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4),
      100,
      true,
      false,
    );
  }

  playChopAnimation() {
    this.cucumberChop.kill();

    COUNTER += 1;

    // LENGTH OF THE TOTAL AMOUNT OF FRAMES
    TOTAL_CHOP_COUNT = this.cucumberChop.animations.frameTotal;

    if (COUNTER <= TOTAL_CHOP_COUNT) {
      this.setupVegetableToChop('cucumber', COUNTER);
    } else {
      this.state.start('OnboardingEnd');
      COUNTER = 1;
    }

    this.chop.play();

    this.knife.animations.play('chop', 15, false);
    this.knife.events.onAnimationComplete.add((e) => {
      e.kill();
      this.createChoppingAnimation();
    }, this);
  }

  shutdown() {
    Arduino.removeEventListener('drum-hit', this.playChopAnimation);

    this.gameEnded = true;
    COUNTER = 1;
  }
};
