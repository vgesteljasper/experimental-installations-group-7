const Button = require('../objects/Button');

let TOTALCHOPCOUNT;
let COUNTER = 1;

module.exports = class Instructions extends Phaser.State {
  init() {
    this.gameEnded = false;
  }
  create() {
    console.log('[Instructions] — Create()');
    this.loadSounds();
    this.createaBackground();
    this.setupVegetableToChop('cucumber', COUNTER, COUNTER + 1);
    this.createChoppingAnimation();
    this.createButton();
  }
  loadSounds() {
    this.chop = this.game.add.audio('chop');
  }
  createaBackground() {
    console.log('[Instructions] — createLogo()');
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }

  setupVegetableToChop(veggie, frameStart, frameStartFrame) {
    console.log('[setupVegetableToChop]', veggie, frameStart, frameStartFrame);
    this.cucumberChop = this.add.sprite(this.world.centerX, this.world.centerY + 300, `${veggie}-cutting-animation`, `${veggie}/chop/000${frameStart}`);
    this.cucumberChop.anchor.setTo(0.5, 0.5);
    this.cucumberChop.animations.add('chop', Phaser.Animation.generateFrameNames(`${veggie}/chop/`, `${frameStart}`, `${frameStartFrame}`, '', 4), 10, true, false);
    this.cucumberChop.scale.setTo(0.3, 0.3);
    console.log('[PlayChopAnimation]', this.cucumberChop.animations);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.PlayChopAnimation, this, 'button', 'Hit');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  PlayChopAnimation() {
    console.log('[PlayChopAnimation]', this.cucumberChop.animations);

    // LENGTH OF THE TOTAL AMOUNT OF FRAMES
    TOTALCHOPCOUNT = this.cucumberChop.animations.frameTotal;
    console.log('[PlayChopAnimation]', TOTALCHOPCOUNT);

    COUNTER += 1;
    if (COUNTER === TOTALCHOPCOUNT + 1) {
      this.state.start('OnboardingEnd');
      COUNTER = TOTALCHOPCOUNT;
    }

    this.chop.play();


    this.cucumberChop.animations.play('chop', 10, false);
    this.cucumberChop.events.onAnimationComplete.add((e) => {
      e.kill();
      this.setupVegetableToChop('cucumber', COUNTER, COUNTER + 1);
    }, this);

    this.knife.animations.play('chop', 10, false);
    this.knife.events.onAnimationComplete.add((e) => {
      e.kill();
      this.createChoppingAnimation();
    }, this);
  }

  createChoppingAnimation() {
    this.knife = this.add.sprite(this.world.centerX + 200, this.world.centerY + 90, 'cutting-animation', 'knife/chop/0001');
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, true);
  }

  shutdown() {
    this.gameEnded = true;
    COUNTER = 1;
  }
};
