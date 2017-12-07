const Button = require('../objects/Button');

// const CHOPCOUNT = 6;

module.exports = class Instructions extends Phaser.State {
  create() {
    console.log('[Instructions] — Create()');
    this.createaBackground();
    this.createVegetableIndicators();
    this.createVegetableToChop();
    this.createChoppingAnimation();
    this.createTimer();
    this.createButton();
  }
  createaBackground() {
    console.log('[Instructions] — createLogo()');
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }

  createVegetableIndicators() {
    // rounded background for the indicators
    this.VegetableIndicatorBackground = this.game.add.graphics(0, 0);
    this.VegetableIndicatorBackground.beginFill(0xFFFFFF, 1);
    this.VegetableIndicatorBackground.drawRoundedRect(1310, 15, 575, 170, 95);

    // left dish
    this.dishCircle = this.game.add.graphics(0, 0);
    this.dishCircle.beginFill(0xededed, 1);
    this.dishCircle.lineStyle(5, 0x69d7a1, 1);
    this.dishCircle.drawCircle(1400, 100, 144);

    // right dish
    this.dishCircle = this.game.add.graphics(0, 0);
    this.dishCircle.beginFill(0xededed, 1);
    this.dishCircle.lineStyle(5, 0xFFFFFF, 1);
    this.dishCircle.drawCircle(1500 + 300, 100, 144);

    // cirlce-active
    this.dishCircle = this.game.add.graphics(0, 0);
    this.dishCircle.lineStyle(10, 0xFFFFFF, 1);
    this.dishCircle.drawCircle(1605, 100, 144);

    // img
    this.spaghetti = this.add.image(1605, 100, 'spaghetti');
    this.spaghetti.anchor.setTo(0.5, 0.5);
    // mask
    this.mask = this.game.add.graphics(0, 0);
    this.mask.beginFill(0xffffff);
    this.mask.drawCircle(1605, 100, 144);
    this.spaghetti.mask = this.mask;
  }

  createVegetableToChop() {
    console.log('[vegtochop]');
  }

  createChoppingAnimation() {
    this.knife = this.add.sprite(this.world.centerX + 200, this.world.centerY + 90, 'cutting-animation', 'knife/chop/0001');
    this.knife.anchor.setTo(0.5, 0.5);
    this.knife.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, true);
  }

  createTimer() {
    this.timerBackground = this.game.add.graphics(0, 0);
    this.timerBackground.beginFill(0xFFFFFF, 1);
    this.timerBackground.lineStyle(5, 0xc1c1c1, 1);
    this.timerBackground.drawRoundedRect(120, 218, 530, 248, 5);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.PlayChopAnimation, this, 'button', 'Start');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  PlayChopAnimation() {
    this.knife.animations.play('chop', 10, false);
    this.knife.events.onAnimationComplete.add((e) => {
      // console.log('[complete]', e._frame.name);
      e.kill();
      this.createChoppingAnimation();
    }, this);
  }

  update() {
    console.log('[Instructions] — Update()');
  }
};
