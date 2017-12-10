const Button = require('../objects/Button');

let TOTAL_CHOP_COUNT;
let COUNTER = 1;
let VEGGIES_COUNTER = 0;

let randomVeggies = [];
let VEGGIE_BEING_CUT = '';
let VEGGIE_NAME = '';
let VEGGIE_XPOS = '';
let VEGGIE_YPOS = '';
let VEGGIE_SCALE = '';

let BLUR_COUNTER = 0;

let TIME_START = '';

module.exports = class Play extends Phaser.State {
  init() {
    console.log('[init] TIME_PLAYED STARTED');
    TIME_START = new Date();
  }
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
    VEGGIE_BEING_CUT = randomVeggies[VEGGIES_COUNTER];
    console.log('[createRandomOrder]', randomVeggies);
    this.setupVeggie(VEGGIE_BEING_CUT);
  }

  setupVeggie(veggie) {
    console.log('[setupVeggie]', veggie);
    if (veggie === 'eggplant') {
      VEGGIE_NAME = 'eggplant';
      VEGGIE_XPOS = this.world.centerX + 50;
      VEGGIE_YPOS = this.world.height - 300;
      VEGGIE_SCALE = 0.25;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, 1, 2);
    } else if (veggie === 'carrot') {
      VEGGIE_NAME = 'carrot';
      VEGGIE_XPOS = this.world.centerX + 50;
      VEGGIE_YPOS = this.world.height - 300;
      VEGGIE_SCALE = 0.25;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, 1, 2);
    } else if (veggie === 'onion') {
      VEGGIE_NAME = 'onion';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 400;
      VEGGIE_SCALE = 0.2;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, 1, 2);
    } else if (veggie === 'cucumber') {
      VEGGIE_NAME = 'cucumber';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 300;
      VEGGIE_SCALE = 0.3;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, 1, 2);
    } else if (veggie === 'paprika') {
      VEGGIE_NAME = 'paprika';
      VEGGIE_XPOS = this.world.centerX + 180;
      VEGGIE_YPOS = this.world.height - 380;
      VEGGIE_SCALE = 0.3;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, 1, 2);
    } else if (veggie === 'tomato') {
      VEGGIE_NAME = 'tomato';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 380;
      VEGGIE_SCALE = 0.2;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, 1, 2);
    }
  }

  // veggies indicators
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

  setupBlur() {
    const blurX = this.game.add.filter('BlurX');
    const blurY = this.game.add.filter('BlurY');
    console.log('[setupBlur]', BLUR_COUNTER);
    blurX.blur = BLUR_COUNTER * 6.5;
    blurY.blur = BLUR_COUNTER * 6.5;
    this.background.filters = [blurX, blurY];
    this.currentVeggie.filters = [blurX, blurY];

    if (VEGGIE_NAME !== 'onion') {
      this.background.filters = [0, 0];
    }
  }

  setupVegetableToChop(name, posX, posY, scale, frameStart, frameStartFrame) {
    console.log('[setupVegetableToChop]', name, posX, posY, scale, frameStart, frameStartFrame);
    this.currentVeggie = this.add.sprite(posX, posY, `${name}-cutting-animation`, `${name}/chop/000${frameStart}`);
    this.currentVeggie.anchor.setTo(0.5, 0.5);
    this.currentVeggie.animations.add('chop', Phaser.Animation.generateFrameNames(`${name}/chop/`, `${frameStart}`, `${frameStartFrame}`, '', 4), 10, true, false);
    this.currentVeggie.scale.setTo(scale, scale);

    if (name === 'onion') {
      this.setupBlur();
    } else {
      const blurX = this.game.add.filter('BlurX');
      const blurY = this.game.add.filter('BlurY');
      blurX.blur = 0;
      blurY.blur = 0;
      this.background.filters = [blurX, blurY];
    }
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.PlayChopAnimation, this, 'button', 'Hit');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  PlayChopAnimation() {
    // console.log('[PlayChopAnimation]', this.currentVeggie.animations);

    // LENGTH OF THE TOTAL AMOUNT OF FRAMES
    TOTAL_CHOP_COUNT = this.currentVeggie.animations.frameTotal;
    // console.log('[PlayChopAnimation]', TOTAL_CHOP_COUNT);

    COUNTER += 1;

    this.currentVeggie.animations.play('chop', 10, false);
    this.currentVeggie.events.onAnimationComplete.add((e) => {
      e.kill();
      if (COUNTER <= TOTAL_CHOP_COUNT) {
        this.setupVegetableToChop(
          VEGGIE_NAME,
          VEGGIE_XPOS,
          VEGGIE_YPOS,
          VEGGIE_SCALE,
          COUNTER,
          COUNTER + 1,
        );
      } else {
        this.setupNextVeggie();
        COUNTER = 1;
      }

      // increase blur
      if (VEGGIE_NAME === 'onion') {
        BLUR_COUNTER += 1;
      }
    }, this);
  }

  setupNextVeggie() {
    console.log('[Play] — setupNextVeggie()');
    // global counter die elke keer 1tje omhoog gaat bij next veggie,
    // -> als  global counter === arr.length dan is spel gedaan

    // Add counter to get the next veggie in the array
    VEGGIES_COUNTER += 1;
    console.log('[setupNextVeggie]', randomVeggies[VEGGIES_COUNTER]);

    if (VEGGIES_COUNTER < randomVeggies.length) {
      console.log('[setupNextVeggie]', VEGGIES_COUNTER, randomVeggies.length);
      this.setupVeggie(randomVeggies[VEGGIES_COUNTER]);
    } else {
      this.state.start('End');
      console.log('[setupNextVeggie]', 'END GAME');
    }
  }

  update() {
    console.log('[Play] — Update()');
  }

  shutdown() {
    console.log('[shutdown] playstate shuts down');
    const TIME_PLAYED = new Date() - TIME_START;
    const TOTAL_TIME = new Date(TIME_PLAYED);
    const minutes = TOTAL_TIME.getMinutes();
    const seconds = TOTAL_TIME.getSeconds();

    // minutes = Math.floor(TIME_PLAYED / 60);
    // seconds = TIME_PLAYED % 60;
    const TIME_FORMAT = `0${minutes}:${seconds}`;
    localStorage.setItem('timePlayed', TIME_FORMAT);
    console.log('[shutdown]', TIME_FORMAT);
  }
};
