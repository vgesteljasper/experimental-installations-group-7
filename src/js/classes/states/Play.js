const ChoppedIndicator = require('./../objects/ChoppedIndicator');
const SuperState = require('./SuperState.js');

let TOTAL_CHOP_COUNT;
let COUNTER = 1;
let VEGGIES_COUNTER = 0;

let VEGGIE_BEING_CUT = '';
let VEGGIE_NAME = '';
let VEGGIE_XPOS = '';
let VEGGIE_YPOS = '';
let VEGGIE_SCALE = '';

let BLUR_COUNTER = 0;
let TIME_START = '';

let SPLASH_COUNTDOWN = 6;

let ENABLE_LEVER = false;
let ENABLE_SLIDER = false;
let DISABLE_HIT = false;

const PROGRESS_START = 1200;

const VEGGIE_GUTTER = 60;

module.exports = class Play extends SuperState {
  init() {
    this.gameEnded = false;
    window.localStorage.clear();
    TIME_START = new Date();
  }

  create() {
    super.create();

    this.veggies = [
      'rotten-cucumber',
      'eggplant',
      'carrot',
      'rotten-pepper',
      'onion',
      'rotten-tomato',
      'cucumber',
      'rotten-eggplant',
      'paprika',
      'tomato',
      'rotten-bell-pepper',
      'rotten-paprika',
    ];

    this.loadSounds();
    this.createaBackground();
    this.shuffleVeggies();

    VEGGIE_BEING_CUT = this.veggies[VEGGIES_COUNTER];
    this.startVeggieSetup(VEGGIE_BEING_CUT);

    this.generateChoppedIndicators();

    this.registerActionTriggers();
  }

  registerActionTriggers() {
    this.game.input.keyboard.addKey(Phaser.KeyCode.D).onUp.add(this.playChopAnimation, this);
    this.game.input.keyboard.addKey(Phaser.KeyCode.L).onUp.add(this.leverVeggieAway, this);
    this.game.input.keyboard.addKey(Phaser.KeyCode.S).onUp.add(this.slideAwayExplosion, this);

    this.playChopAnimation = this.playChopAnimation.bind(this);
    this.leverVeggieAway = this.leverVeggieAway.bind(this);
    this.slideAwayExplosion = this.slideAwayExplosion.bind(this);
    Arduino.addEventListener('drum-hit', this.playChopAnimation);
    Arduino.addEventListener('lever-pull', this.leverVeggieAway);
    Arduino.addEventListener('slider-move', this.slideAwayExplosion);
  }

  loadSounds() {
    this.chop = this.game.add.audio('chop');
    this.fart = this.game.add.audio('fart');
    this.fart.volume = 3;
    this.lever = this.game.add.audio('lever');
    this.slider = this.game.add.audio('slider');
    this.fart.volume = 2;
  }

  createaBackground() {
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }

  shuffleVeggies() {
    if (this.gameEnded) {
      return;
    }

    this.veggies = this.shuffle(this.veggies);
  }

  shuffle(array) {
    let len = array.length;
    let t;
    let i;
    while (len) {
      i = this.game.rnd.integerInRange(0, (len -= 1));
      t = array[len];
      array[len] = array[i];
      array[i] = t;
    }
    return array;
  }

  positionVegetableToChop(name, xpos, ypos, scale) {
    VEGGIE_NAME = name;
    VEGGIE_XPOS = xpos;
    VEGGIE_YPOS = ypos;
    VEGGIE_SCALE = scale;
  }

  startVeggieSetup(veggie) {
    if (this.gameEnded) {
      return;
    }

    const center = this.world.centerX;
    const height = this.world.height;

    switch (veggie) {
      case 'eggplant':
        this.positionVegetableToChop('eggplant', center + 50, height - 300, 0.9);
        break;

      case 'carrot':
        this.positionVegetableToChop('carrot', center + 50, height - 300, 1.1);
        break;

      case 'onion':
        this.positionVegetableToChop('onion', center, height - 400, 0.5);
        break;

      case 'cucumber':
        this.positionVegetableToChop('cucumber', center, height - 300, 1.1);
        break;

      case 'paprika':
        this.positionVegetableToChop('paprika', center, height - 400, 1);
        break;

      case 'tomato':
        this.positionVegetableToChop('tomato', center, height - 380, 1);
        break;

      case 'rotten-eggplant':
        this.positionVegetableToChop('rotten-eggplant', center + 80, height - 370, 0.7);
        ENABLE_LEVER = true;
        break;

      case 'rotten-pepper':
        this.positionVegetableToChop('rotten-pepper', center + 50, height - 380, 1);
        ENABLE_LEVER = true;
        break;

      case 'rotten-bell-pepper':
        this.positionVegetableToChop('rotten-bell-pepper', center, height - 430, 0.9);
        ENABLE_LEVER = true;
        break;

      case 'rotten-tomato':
        this.positionVegetableToChop('rotten-tomato', center, height - 380, 1);
        ENABLE_LEVER = true;
        break;

      case 'rotten-cucumber':
        this.positionVegetableToChop('rotten-cucumber', center, height - 300, 1.1);
        ENABLE_LEVER = true;
        break;

      case 'rotten-paprika':
        this.positionVegetableToChop('rotten-paprika', center, height - 400, 1);
        ENABLE_LEVER = true;
        break;

      default:
        break;
    }

    this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
  }

  generateChoppedIndicators() {
    this.VegetableIndicatorBackground = this.game.add.graphics(0, 0);
    this.VegetableIndicatorBackground.beginFill(0xffffff, 1);
    this.VegetableIndicatorBackground.drawRoundedRect(PROGRESS_START - 50, 15, 760, 100, 58);

    this.veggieProgressArray = [];

    let i = 0;

    while (i < this.veggies.length) {
      const indicator = new ChoppedIndicator(this.game, i, VEGGIE_GUTTER, PROGRESS_START);
      this.veggieProgressArray.push(indicator);
      i += 1;
    }
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

    if (name !== 'rotten-eggplant' &&
    name !== 'rotten-pepper' &&
    name !== 'rotten-cucumber' &&
    name !== 'rotten-bell-pepper' &&
    name !== 'rotten-tomato' &&
    name !== 'rotten-paprika') {
      this.currentVeggie = this.add.sprite(
        posX,
        posY,
        `${name}-cutting-animation`,
        `${name}/chop/000${frameStart}`,
      );
      this.currentVeggie.anchor.setTo(0.5, 0.5);
      this.currentVeggie.scale.setTo(scale, scale);
    } else {
      this.rottenVeggie = this.add.sprite(posX, posY, name);
      this.rottenVeggie.anchor.setTo(0.5, 0.5);
      this.rottenVeggie.scale.setTo(scale, scale);
    }
  }

  slideAwayExplosion() {
    if (!ENABLE_SLIDER) {
      return;
    }

    this.splash.kill();

    this.slider.play();

    SPLASH_COUNTDOWN -= 1;
    ENABLE_LEVER = false;

    if (VEGGIE_NAME === 'rotten-pepper' || VEGGIE_NAME === 'rotten-paprika' || VEGGIE_NAME === 'rotten-tomato') {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation-red',
        `splash/000${SPLASH_COUNTDOWN}`,
      );
    } else if (VEGGIE_NAME === 'rotten-cucumber' || VEGGIE_NAME === 'rotten-bell-pepper') {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation-green',
        `splash/000${SPLASH_COUNTDOWN}`,
      );
    } else {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation',
        `splash/000${SPLASH_COUNTDOWN}`,
      );
    }
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);


    if (SPLASH_COUNTDOWN <= 1) {
      ENABLE_SLIDER = false;
      DISABLE_HIT = false;
      this.splash.kill();
      this.rottenVeggie.kill();
      this.setupNextVeggie();
      SPLASH_COUNTDOWN = 6;
      COUNTER = 1;
    }
  }

  playSplashAnimation() {
    DISABLE_HIT = true;
    ENABLE_LEVER = false;

    if (VEGGIE_NAME === 'rotten-pepper' || VEGGIE_NAME === 'rotten-paprika' || VEGGIE_NAME === 'rotten-tomato') {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation-red',
        'splash/0001',
      );
    } else if (VEGGIE_NAME === 'rotten-cucumber' || VEGGIE_NAME === 'rotten-bell-pepper') {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation-green',
        'splash/0001',
      );
    } else {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation',
        'splash/0001',
      );
    }

    this.fart.play();

    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);
    this.splash.animations.add(
      'splash',
      Phaser.Animation.generateFrameNames('splash/', 1, 6, '', 4),
      25,
      true,
      false,
    );
    this.splash.animations.play('splash', 25, false);

    this.splash.events.onAnimationComplete.add((e) => {
      e.kill();
      this.setupReverseAnimation();
      ENABLE_SLIDER = true;
    }, this);
  }

  setupReverseAnimation() {
    if (VEGGIE_NAME === 'rotten-pepper' || VEGGIE_NAME === 'rotten-paprika' || VEGGIE_NAME === 'rotten-tomato') {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation-red',
        `splash/000${SPLASH_COUNTDOWN}`,
      );
    } else if (VEGGIE_NAME === 'rotten-cucumber' || VEGGIE_NAME === 'rotten-bell-pepper') {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation-green',
        `splash/000${SPLASH_COUNTDOWN}`,
      );
    } else {
      this.splash = this.add.sprite(
        this.world.centerX,
        this.world.centerY - 20,
        'splash-animation',
        `splash/000${SPLASH_COUNTDOWN}`,
      );
    }
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);
  }

  playChopAnimation() {
    if (this.gameEnded || DISABLE_HIT) {
      return;
    }

    COUNTER += 1;

    this.chop.play();

    if (VEGGIE_NAME !== 'rotten-eggplant' &&
    VEGGIE_NAME !== 'rotten-pepper' &&
    VEGGIE_NAME !== 'rotten-cucumber' &&
    VEGGIE_NAME !== 'rotten-bell-pepper' &&
    VEGGIE_NAME !== 'rotten-tomato' &&
    VEGGIE_NAME !== 'rotten-paprika') {
      // LENGTH OF THE TOTAL AMOUNT OF FRAMES
      TOTAL_CHOP_COUNT = this.currentVeggie.animations.frameTotal;
      this.currentVeggie.kill();

      if (COUNTER <= TOTAL_CHOP_COUNT) {
        this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, COUNTER);
      } else {
        this.setupNextVeggie();
        COUNTER = 1;
      }
    } else {
      this.playSplashAnimation();
    }

    if (VEGGIE_NAME === 'onion') {
      this.setupBlur();
      BLUR_COUNTER += 1;
    }
  }

  leverVeggieAway() {
    if (!ENABLE_LEVER) {
      return;
    }

    this.lever.play();

    ENABLE_LEVER = false;
    this.rottenVeggie.kill();
    this.setupNextVeggie();
  }

  setupNextVeggie() {
    if (this.gameEnded) {
      return;
    }

    this.updateProgressbar();

    // Add counter to get the next veggie in the array
    VEGGIES_COUNTER += 1;

    if (VEGGIES_COUNTER < this.veggies.length) {
      this.startVeggieSetup(this.veggies[VEGGIES_COUNTER]);
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
      window.localStorage.setItem('timePlayed', TIME_FORMAT);

      this.state.start('End');
    }
  }

  updateProgressbar() {
    this.veggieProgressArray[VEGGIES_COUNTER].kill();

    const veggieChopped = this.game.add.graphics(0, 0);
    veggieChopped.beginFill(0xededed, 1);
    veggieChopped.lineStyle(2, 0x00ff00, 1);
    veggieChopped.drawCircle(PROGRESS_START + (VEGGIES_COUNTER * VEGGIE_GUTTER), 65, 50);
  }

  goToMenuState(e) {
    const state = e.detail.active;

    if (!state) {
      this.state.start('Menu');
    }
  }

  shutdown() {
    super.shutdown();
    
    Arduino.removeEventListener('drum-hit', this.playChopAnimation);
    Arduino.removeEventListener('lever-pull', this.leverVeggieAway);
    Arduino.removeEventListener('slider-move', this.slideAwayExplosion);

    COUNTER = 1;
    VEGGIES_COUNTER = 0;

    // RANDOM_VEGGIES = [];
    VEGGIE_BEING_CUT = '';
    VEGGIE_NAME = '';
    VEGGIE_XPOS = '';
    VEGGIE_YPOS = '';
    VEGGIE_SCALE = '';

    BLUR_COUNTER = 0;

    TIME_START = '';
  }
};
