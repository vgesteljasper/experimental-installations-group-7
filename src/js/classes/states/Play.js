const Button = require('../objects/Button');

let TOTALCHOPCOUNT;
// const COUNTER = 1;
const VEGGIESCOUNTER = 0;

let randomVeggies = [];

module.exports = class Play extends Phaser.State {
  create() {
    console.log('[Play] — Create()');
    this.createaBackground();

    // shuffle array
    this.createRandomOrder();

    // indicator of what to chop and what already chopped
    // this.createVeggiesToChop();

    // visaualisation of the timer
    // this.createTimer();

    // create blur when cutting the onion
    // this.createBlur();

    // collected all veggies on the plate
    // this.setupVegetables();

    // CHOPPING AND VEGGIE RELATED
    // this.setupVegetableToChop('onion', COUNTER, COUNTER + 1);
    this.createButton();
  }
  createaBackground() {
    console.log('[Play] — createLogo()');
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }

  shuffle(array) {
    let len = array.length;
    let t;
    let i;
    while (len) {
      i = this.game.rnd.integerInRange(0, len -= 1);
      t = array[len];
      array[len] = array[i];
      array[i] = t;
    }
    return array;
  }

  createRandomOrder() {
    const veggies = ['eggplant', 'carrot', 'onion', 'cucumber', 'paprika', 'tomato'];
    randomVeggies = this.shuffle(veggies);
    this.setupVeggie(randomVeggies[VEGGIESCOUNTER]);
  }

  setupVeggie(veggie) {
    console.log('[setupVeggie]', veggie);
    if (veggie === 'eggplant') {
      this.eggplantAnimation = this.add.sprite(this.world.centerX + 50, this.world.height - 350, 'eggplant-cutting-animation', 'eggplant/chop/0001');
      this.eggplantAnimation.anchor.setTo(0.5, 0.5);
      this.eggplantAnimation.scale.setTo(0.25, 0.25);
      this.eggplantAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('eggplant/chop/', 1, 5, '', 4), 5, true, false);
      this.eggplantAnimation.animations.play('chop', 10, true);
    } else if (veggie === 'carrot') {
      this.carrotAnimation = this.add.sprite(this.world.centerX + 50, this.world.height - 300, 'carrot-cutting-animation', 'carrot/chop/0001');
      this.carrotAnimation.anchor.setTo(0.5, 0.5);
      this.carrotAnimation.scale.setTo(0.25, 0.25);
      this.carrotAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('carrot/chop/', 1, 9, '', 4), 5, true, false);
      this.carrotAnimation.animations.play('chop', 10, true);
    } else if (veggie === 'onion') {
      this.onionAnimation = this.add.sprite(this.world.centerX, this.world.height - 400, 'onion-cutting-animation', 'onion/chop/0001');
      this.onionAnimation.anchor.setTo(0.5, 0.5);
      this.onionAnimation.scale.setTo(0.2, 0.2);
      this.onionAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('onion/chop/', 1, 5, '', 4), 5, true, false);
      this.onionAnimation.animations.play('chop', 10, true);
    } else if (veggie === 'cucumber') {
      this.cucumberAnimation = this.add.sprite(this.world.centerX, this.world.centerY + 300, 'cucumber-cutting-animation', 'cucumber/chop/0001');
      this.cucumberAnimation.anchor.setTo(0.5, 0.5);
      this.cucumberAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('cucumber/chop/', '1', '5', '', 4), 10, true, false);
      this.cucumberAnimation.scale.setTo(0.3, 0.3);
      this.cucumberAnimation.animations.play('chop', 10, true);
    } else if (veggie === 'paprika') {
      this.paprikaAnimation = this.add.sprite(this.world.centerX + 180, this.world.height - 380, 'paprika-cutting-animation', 'paprika/chop/0001');
      this.paprikaAnimation.anchor.setTo(0.5, 0.5);
      this.paprikaAnimation.scale.setTo(0.3, 0.3);
      this.paprikaAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('paprika/chop/', 1, 6, '', 4), 5, true, false);
      this.paprikaAnimation.animations.play('chop', 10, true);
    } else if (veggie === 'tomato') {
      this.tomatoAnimation = this.add.sprite(this.world.centerX, this.world.height - 380, 'tomato-cutting-animation', 'tomato/chop/0001');
      this.tomatoAnimation.anchor.setTo(0.5, 0.5);
      this.tomatoAnimation.scale.setTo(0.2, 0.2);
      this.tomatoAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('tomato/chop/', 1, 6, '', 4), 5, true, false);
      this.tomatoAnimation.animations.play('chop', 10, true);
    }
  }

  createVeggiesToChop() {
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

  createTimer() {
    this.timerBackground = this.game.add.graphics(0, 0);
    this.timerBackground.beginFill(0xFFFFFF, 1);
    this.timerBackground.lineStyle(5, 0xc1c1c1, 1);
    this.timerBackground.drawRoundedRect(120, 218, 530, 248, 5);
  }

  createBlur() {
    const blurX = this.game.add.filter('BlurX');
    const blurY = this.game.add.filter('BlurY');

    blurX.blur = 10;
    blurY.blur = 10;

    this.background.filters = [blurX, blurY];
  }

  setupVegetables() {
    this.paprikaAnimation = this.add.sprite(this.world.centerX + 180, this.world.height - 380, 'paprika-cutting-animation', 'paprika/chop/0001');
    this.paprikaAnimation.anchor.setTo(0.5, 0.5);
    this.paprikaAnimation.scale.setTo(0.3, 0.3);
    this.paprikaAnimation.animations.add('chop', Phaser.Animation.generateFrameNames('paprika/chop/', 1, 6, '', 4), 5, true, false);
    this.paprikaAnimation.animations.play('chop', 10, true);
  }

  setupVegetableToChop(veggie, frameStart, frameStartFrame) {
    console.log('[setupVegetableToChop]', veggie, frameStart, frameStartFrame);
    this.currentVeggie = this.add.sprite(this.world.centerX, this.world.height - 400, `${veggie}-cutting-animation`, `${veggie}/chop/000${frameStart}`);
    this.currentVeggie.anchor.setTo(0.5, 0.5);
    this.currentVeggie.animations.add('chop', Phaser.Animation.generateFrameNames(`${veggie}/chop/`, `${frameStart}`, `${frameStartFrame}`, '', 4), 10, true, false);
    this.currentVeggie.scale.setTo(0.2, 0.2);

    // if (veggie === 'onion') {
    //   console.log('[PlayChopAnimation]', 'yes, ONION');
    // }
    // console.log('[PlayChopAnimation]', this.currentVeggie.animations);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.PlayChopAnimation, this, 'button', 'Hit');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  setupNextVeggie() {
    console.log('[Play] — setupNextVeggie()');
    // global counter die elke keer 1tje omhoog gaat bij next veggie,
    // -> als  global counter === arr.length dan is spel gedaan
  }

  update() {
    console.log('[Play] — Update()');
  }
};
