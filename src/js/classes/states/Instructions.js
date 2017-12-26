const Button = require('../objects/Button');

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
    this.createButton();
  }
  loadSounds() {
    this.chop = this.game.add.audio('chop');
  }
  createaBackground() {
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }
  createInstructions() {
    this.subTitle = this.add.text(
      this.world.centerX,
      300,
      `Sla op de plank om
      de groente in stukken te slaan`,
      { font: '50px circular-medium', fill: '#000', align: 'center' },
    );
    this.subTitle.anchor.setTo(0.5, 0.5);
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

  createButton() {
    const buttonPlay = new Button(
      this.game,
      this.world.centerX,
      this.world.height - 150,
      this.PlayChopAnimation,
      this,
      'button',
      'Hit',
    );
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
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

  PlayChopAnimation() {
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
    this.gameEnded = true;
    COUNTER = 1;
  }
};
