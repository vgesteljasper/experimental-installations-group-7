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

let COUNTDOWN = 6;

module.exports = class Play extends Phaser.State {
  init() {
    this.gameEnded = false;
    localStorage.clear();
    TIME_START = new Date();
  }
  create() {
    console.log('[Play] — Create()');
    this.loadSounds();
    this.createaBackground();

    this.createRandomOrder();

    // indicator of what to chop and what already chopped
    // this.createVeggiesToChop();

    // visaualisation of the timer
    // this.createTimer();
    this.createButton();
  }
  loadSounds() {
    this.chop = this.game.add.audio('chop');
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
    if (this.gameEnded) {
      return;
    }
    const veggies = ['eggplant', 'carrot', 'onion', 'cucumber', 'rotten-eggplant', 'paprika', 'tomato'];
    randomVeggies = this.shuffle(veggies);
    VEGGIE_BEING_CUT = randomVeggies[VEGGIES_COUNTER];
    console.log('[createRandomOrder]', randomVeggies);
    this.setupVeggie(VEGGIE_BEING_CUT);
  }

  setupVeggie(veggie) {
    if (this.gameEnded) {
      return;
    }
    if (veggie === 'eggplant') {
      VEGGIE_NAME = 'eggplant';
      VEGGIE_XPOS = this.world.centerX + 50;
      VEGGIE_YPOS = this.world.height - 300;
      VEGGIE_SCALE = 0.9;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
    } else if (veggie === 'carrot') {
      VEGGIE_NAME = 'carrot';
      VEGGIE_XPOS = this.world.centerX + 50;
      VEGGIE_YPOS = this.world.height - 300;
      VEGGIE_SCALE = 1.1;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
    } else if (veggie === 'onion') {
      VEGGIE_NAME = 'onion';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 400;
      VEGGIE_SCALE = 0.5;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
    } else if (veggie === 'cucumber') {
      VEGGIE_NAME = 'cucumber';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 300;
      VEGGIE_SCALE = 1.1;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
    } else if (veggie === 'paprika') {
      VEGGIE_NAME = 'paprika';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 400;
      VEGGIE_SCALE = 1;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
    } else if (veggie === 'tomato') {
      VEGGIE_NAME = 'tomato';
      VEGGIE_XPOS = this.world.centerX;
      VEGGIE_YPOS = this.world.height - 380;
      VEGGIE_SCALE = 1;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
    } else if (veggie === 'rotten-eggplant') {
      VEGGIE_NAME = 'rotten-eggplant';
      VEGGIE_XPOS = this.world.centerX + 50;
      VEGGIE_YPOS = this.world.height - 380;
      VEGGIE_SCALE = 0.7;
      this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
      this.createLever();
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
    if (this.gameEnded) {
      return;
    }
    const blurX = this.game.add.filter('BlurX');
    const blurY = this.game.add.filter('BlurY');
    blurX.blur = BLUR_COUNTER * 6.5;
    blurY.blur = BLUR_COUNTER * 6.5;
    this.background.filters = [blurX, blurY];
    this.currentVeggie.filters = [blurX, blurY];
  }

  removeBlur() {
    const blurX = this.game.add.filter('BlurX');
    const blurY = this.game.add.filter('BlurY');
    blurX.blur = 0;
    blurY.blur = 0;
    this.background.filters = [blurX, blurY];
  }

  setupVegetableToChop(name, posX, posY, scale, frameStart = 1) {
    if (this.gameEnded) {
      return;
    }

    this.removeBlur();

    if (name !== 'rotten-eggplant') {
      this.currentVeggie = this.add.sprite(posX, posY, `${name}-cutting-animation`, `${name}/chop/000${frameStart}`);
      this.currentVeggie.anchor.setTo(0.5, 0.5);
      this.currentVeggie.scale.setTo(scale, scale);
    } else {
      this.rottenEggplant = this.add.sprite(posX, posY, name);
      this.rottenEggplant.anchor.setTo(0.5, 0.5);
      this.rottenEggplant.scale.setTo(scale, scale);
    }
  }

  slideAwayExplosion() {
    COUNTDOWN -= 1;
    console.log('[slideAwayExplosion()]', COUNTDOWN);
    this.splash.kill();
    this.splash = this.add.sprite(this.world.centerX, this.world.centerY - 20, 'splash-animation', `splash/000${COUNTDOWN}`);
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);

    if (COUNTDOWN === 1) {
      console.log('[setupReverseAnimation()] — COUNTDOWN is 1');
      this.splash.kill();
      this.buttonSlider.kill();
      this.buttonLever.kill();
      this.rottenEggplant.kill();
      this.setupNextVeggie();
      COUNTDOWN = 6;
    }
  }

  setupReverseAnimation() {
    this.splash = this.add.sprite(this.world.centerX, this.world.centerY - 20, 'splash-animation', `splash/000${COUNTDOWN}`);
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);
  }

  playSplashAnimation() {
    this.splash = this.add.sprite(this.world.centerX, this.world.centerY - 20, 'splash-animation', 'splash/0001');
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);
    this.splash.animations.add('splash', Phaser.Animation.generateFrameNames('splash/', 1, 6, '', 4), 25, true, false);
    this.splash.animations.play('splash', 25, false);

    // REVERSE SPLASHEFFECT. CHECK IF ANIMATION IS BACK AT FRAME 1 & THEN GO TO NEXT VEGGIE
    this.splash.events.onAnimationComplete.add((e) => {
      e.kill();
      this.setupReverseAnimation();
      this.createSlider();
    }, this);
  }

  playChopAnimation() {
    if (this.gameEnded) {
      return;
    }

    COUNTER += 1;
    this.chop.play();

    if (VEGGIE_NAME !== 'rotten-eggplant') {
      // LENGTH OF THE TOTAL AMOUNT OF FRAMES
      TOTAL_CHOP_COUNT = this.currentVeggie.animations.frameTotal;
      this.currentVeggie.kill();

      if (COUNTER <= TOTAL_CHOP_COUNT) {
        this.setupVegetableToChop(
          VEGGIE_NAME,
          VEGGIE_XPOS,
          VEGGIE_YPOS,
          VEGGIE_SCALE,
          COUNTER,
        );
      } else {
        this.setupNextVeggie();
        COUNTER = 1;
      }
    } else if (VEGGIE_NAME === 'rotten-eggplant') {
      this.createLever();
    }

    if (VEGGIE_NAME === 'onion') {
      console.log('[VEGGIE_NAME === onion]');
      this.setupBlur();
      BLUR_COUNTER += 1;
    }

    if (VEGGIE_NAME === 'rotten-eggplant' && COUNTER === 2) {
      console.log('[playChopAnimation]', 'oepsie ive chopped');
      this.buttonLever.kill();
      this.playSplashAnimation();
    }
  }

  createButton() {
    this.buttonPlay = new Button(this.game, this.world.centerX, this.world.height - 150, this.playChopAnimation, this, 'button', 'Hit');
    this.buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(this.buttonPlay);
  }

  leverVeggieAway() {
    this.rottenEggplant.kill();
    this.setupNextVeggie();
  }

  createSlider() {
    this.buttonSlider = new Button(this.game, this.world.centerX - 550, this.world.height - 150, this.slideAwayExplosion, this, 'button', 'Slider');
    this.buttonSlider.anchor.setTo(0.5, 0.5);
    this.add.existing(this.buttonSlider);
  }

  createLever() {
    this.buttonLever = new Button(this.game, this.world.centerX + 550, this.world.height - 150, this.leverVeggieAway, this, 'button', 'Lever');
    this.buttonLever.anchor.setTo(0.5, 0.5);
    this.add.existing(this.buttonLever);
  }

  setupNextVeggie() {
    if (this.gameEnded) {
      return;
    }

    if (this.buttonLever) {
      this.buttonLever.kill();
    }

    // Add counter to get the next veggie in the array
    VEGGIES_COUNTER += 1;

    if (VEGGIES_COUNTER < randomVeggies.length) {
      this.setupVeggie(randomVeggies[VEGGIES_COUNTER]);
    } else {
      this.gameEnded = true;

      const TIME_PLAYED = new Date() - TIME_START;
      const TOTAL_TIME = new Date(TIME_PLAYED);
      const minutes = TOTAL_TIME.getMinutes();
      let seconds = TOTAL_TIME.getSeconds();

      if (seconds < 10) {
        seconds = `0${seconds}`;
      } else {
        seconds = `${seconds}`;
      }
      const TIME_FORMAT = `0${minutes}:${seconds}`;
      localStorage.setItem('timePlayed', TIME_FORMAT);

      this.state.start('End');
    }
  }

  shutdown() {
    COUNTER = 1;
    VEGGIES_COUNTER = 0;

    randomVeggies = [];
    VEGGIE_BEING_CUT = '';
    VEGGIE_NAME = '';
    VEGGIE_XPOS = '';
    VEGGIE_YPOS = '';
    VEGGIE_SCALE = '';

    BLUR_COUNTER = 0;

    TIME_START = '';
  }
};
