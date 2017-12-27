const ChoppedIndicator = require('./../objects/ChoppedIndicator');

let TOTAL_CHOP_COUNT;
let COUNTER = 1;
let VEGGIES_COUNTER = 0;

// let RANDOM_VEGGIES = [];
let VEGGIE_BEING_CUT = '';
let VEGGIE_NAME = '';
let VEGGIE_XPOS = '';
let VEGGIE_YPOS = '';
let VEGGIE_SCALE = '';

let BLUR_COUNTER = 0;
let TIME_START = '';

let COUNTDOWN = 6;

let ENABLE_LEVER = false;
let ENABLE_SLIDER = false;
let DISABLE_HIT = false;

const VEGGIE_GUTTER = 60;

module.exports = class Play extends Phaser.State {
  init() {
    this.gameEnded = false;
    window.localStorage.clear();
    TIME_START = new Date();
  }
  create() {
    console.log('[Play] — Create()');

    this.veggies = [
      'eggplant',
      'carrot',
      'onion',
      'cucumber',
      'rotten-eggplant',
      'paprika',
      'tomato',
    ];

    this.loadSounds();
    this.createaBackground();
    this.shuffleVeggies();

    VEGGIE_BEING_CUT = this.veggies[VEGGIES_COUNTER];
    this.startVeggieSetup(VEGGIE_BEING_CUT);

    // indicator of what to chop and what already chopped
    this.generateChoppedIndicators();

    this.registerKeys();
  }

  registerKeys() {
    this.chopKey = this.game.input.keyboard.addKey(Phaser.KeyCode.C);
    this.chopKey.onUp.add(this.playChopAnimation, this);

    this.leverKey = this.game.input.keyboard.addKey(Phaser.KeyCode.L);
    this.leverKey.onUp.add(this.leverVeggieAway, this);

    this.sliderKey = this.game.input.keyboard.addKey(Phaser.KeyCode.S);
    this.sliderKey.onUp.add(this.slideAwayExplosion, this);
  }

  loadSounds() {
    this.chop = this.game.add.audio('chop');
  }

  createaBackground() {
    console.log('[Play] — createLogo()');
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
        this.positionVegetableToChop('rotten-eggplant', center + 50, height - 380, 0.7);
        ENABLE_LEVER = true;
        break;

      default:
        break;
    }

    this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
  }

  // veggies indicators
  generateChoppedIndicators() {
    // rounded background for the indicators
    this.VegetableIndicatorBackground = this.game.add.graphics(0, 0);
    this.VegetableIndicatorBackground.beginFill(0xffffff, 1);
    this.VegetableIndicatorBackground.drawRoundedRect(1450, 15, 460, 100, 58);

    this.veggieProgressArray = [];

    let i = 0;
    while (i < 7) {
      const indicator = new ChoppedIndicator(this.game, i, VEGGIE_GUTTER);
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

    if (name !== 'rotten-eggplant') {
      this.currentVeggie = this.add.sprite(
        posX,
        posY,
        `${name}-cutting-animation`,
        `${name}/chop/000${frameStart}`,
      );
      this.currentVeggie.anchor.setTo(0.5, 0.5);
      this.currentVeggie.scale.setTo(scale, scale);
    } else {
      this.rottenEggplant = this.add.sprite(posX, posY, name);
      this.rottenEggplant.anchor.setTo(0.5, 0.5);
      this.rottenEggplant.scale.setTo(scale, scale);
    }
  }

  slideAwayExplosion() {
    if (!ENABLE_SLIDER) {
      return;
    }

    COUNTDOWN -= 1;
    ENABLE_LEVER = false;

    this.splash.kill();
    this.splash = this.add.sprite(
      this.world.centerX,
      this.world.centerY - 20,
      'splash-animation',
      `splash/000${COUNTDOWN}`,
    );
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);

    if (COUNTDOWN === 1) {
      console.log('[slideAwayExplosion]', 'COUNTDOWN is ONE');
      ENABLE_SLIDER = false;
      DISABLE_HIT = false;
      this.splash.kill();
      this.rottenEggplant.kill();
      this.setupNextVeggie();
      COUNTDOWN = 6;
    }
  }

  setupReverseAnimation() {
    this.splash = this.add.sprite(
      this.world.centerX,
      this.world.centerY - 20,
      'splash-animation',
      `splash/000${COUNTDOWN}`,
    );
    this.splash.anchor.setTo(0.5, 0.5);
    this.splash.scale.setTo(1.8, 1.8);
  }

  playSplashAnimation() {
    DISABLE_HIT = true;
    ENABLE_LEVER = false;

    this.splash = this.add.sprite(
      this.world.centerX,
      this.world.centerY - 20,
      'splash-animation',
      'splash/0001',
    );
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

    // REVERSE SPLASHEFFECT. CHECK IF ANIMATION IS BACK AT FRAME 1 & THEN GO TO NEXT VEGGIE
    this.splash.events.onAnimationComplete.add((e) => {
      e.kill();
      this.setupReverseAnimation();
      ENABLE_SLIDER = true;
    }, this);
  }

  playChopAnimation() {
    if (this.gameEnded || DISABLE_HIT) {
      return;
    }

    COUNTER += 1;
    this.chop.play();

    if (VEGGIE_NAME !== 'rotten-eggplant') {
      // LENGTH OF THE TOTAL AMOUNT OF FRAMES
      TOTAL_CHOP_COUNT = this.currentVeggie.animations.frameTotal;
      this.currentVeggie.kill();

      if (COUNTER <= TOTAL_CHOP_COUNT) {
        this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, COUNTER);
      } else {
        this.setupNextVeggie();
        COUNTER = 1;
      }
    } else if (VEGGIE_NAME === 'rotten-eggplant' && COUNTER === 2) {
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

    ENABLE_LEVER = false;
    this.rottenEggplant.kill();
    this.setupNextVeggie();
  }

  updateProgressbar() {
    this.veggieProgressArray[VEGGIES_COUNTER].kill();

    const veggieChopped = this.game.add.graphics(0, 0);
    veggieChopped.beginFill(0xededed, 1);
    veggieChopped.lineStyle(2, 0x00ff00, 1);
    veggieChopped.drawCircle(1500 + VEGGIES_COUNTER * VEGGIE_GUTTER, 65, 50);
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

  shutdown() {
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
