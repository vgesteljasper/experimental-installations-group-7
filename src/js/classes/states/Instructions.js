const SuperState = require('./SuperState.js');

let TOTAL_CHOP_COUNT;
let COUNTER = 1;
let VEGGIES_COUNTER = 0;

let VEGGIE_BEING_CUT = '';
let VEGGIE_NAME = '';
let VEGGIE_XPOS = '';
let VEGGIE_YPOS = '';
let VEGGIE_SCALE = '';

let ENABLE_LEVER = false;
let COUNTDOWN = 6;

let ENABLE_SLIDER = false;
let DISABLE_HIT = false;

module.exports = class Instructions extends SuperState {
  init() {
    this.gameEnded = false;
  }
  create() {
    super.create();

    this.veggies = [
      'cucumber',
      'rotten-pepper',
      'rotten-eggplant',
    ];
    this.loadSounds();
    this.createaBackground();

    VEGGIE_BEING_CUT = this.veggies[VEGGIES_COUNTER];
    this.startVeggieSetup(VEGGIE_BEING_CUT);
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
    this.slider.volume = 2;
  }

  createaBackground() {
    this.background = this.add.image(0, 0, 'kitchenBackground');
  }

  setupVegetableToChop(name, posX, posY, scale, frameStart = 1) {
    if (this.gameEnded) {
      return;
    }

    if (name !== 'rotten-eggplant' && name !== 'rotten-pepper') {
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

  positionVegetableToChop(name, xpos, ypos, scale) {
    VEGGIE_NAME = name;
    VEGGIE_XPOS = xpos;
    VEGGIE_YPOS = ypos;
    VEGGIE_SCALE = scale;
  }

  setupHittingAnimation() {
    /* INSTEAD OF TEXT */

    this.iconBackground = this.game.add.graphics(0, 0);
    this.iconBackground.beginFill(0xFFFFFF, 0.8);
    this.iconBackground.drawRect(0, 0, this.world.width, 330);
    this.iconBackground.endFill();
    this.iconBackground.anchor.setTo(0.5, 0.5);

    if (this.leverOnboarding) {
      this.leverOnboarding.kill();
    }

    this.plateOnboarding = this.add.sprite(
      this.world.centerX,
      250,
      'plate-animation',
      'plate/0001',
    );
    this.plateOnboarding.anchor.setTo(0.5, 0.5);
    this.plateOnboarding.animations.add('pressure', Phaser.Animation.generateFrameNames('plate/', 1, 5, '', 4), 2, true, false);
    this.plateOnboarding.scale.setTo(0.5, 0.5);
    this.plateOnboarding.animations.play('pressure', 10, true);

    this.knifeOnboarding = this.add.sprite(
      this.world.centerX + 60,
      130,
      'cutting-animation',
      'knife/chop/0001',
    );
    this.knifeOnboarding.anchor.setTo(0.5, 0.5);
    this.knifeOnboarding.animations.add('chop', Phaser.Animation.generateFrameNames('knife/chop/', 1, 5, '', 4), 5, true, false);
    this.knifeOnboarding.scale.setTo(0.6, 0.6);
    this.knifeOnboarding.animations.play('chop', 10, true);
  }

  setupLeverAnimation() {
    this.plateOnboarding.kill();
    this.knifeOnboarding.kill();

    this.leverOnboarding = this.add.sprite(
      this.world.centerX,
      170,
      'lever-animation',
      'lever/0001',
    );
    this.leverOnboarding.anchor.setTo(0.5, 0.5);
    this.leverOnboarding.animations.add('lever', Phaser.Animation.generateFrameNames('lever/', 1, 2, '', 4), 2, true, false);
    this.leverOnboarding.scale.setTo(0.5, 0.5);
    this.leverOnboarding.animations.play('lever', 2, true);
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

  setupFaderAnimation() {
    this.faderOnboarding = this.add.sprite(
      this.world.centerX,
      150,
      'fader-animation',
      'fader/0001',
    );
    this.faderOnboarding.anchor.setTo(0.5, 0.5);
    this.faderOnboarding.animations.add('fader', Phaser.Animation.generateFrameNames('fader/', 1, 3, '', 4), 2, true, false);
    this.faderOnboarding.scale.setTo(0.6, 0.6);
    this.faderOnboarding.animations.play('fader', 6, true);
  }

  playSplashAnimation() {
    this.leverOnboarding.kill();

    DISABLE_HIT = true;
    ENABLE_LEVER = false;

    this.fart.play();

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

    this.splash.events.onAnimationComplete.add((e) => {
      e.kill();
      this.setupReverseAnimation();
      this.setupFaderAnimation();
      ENABLE_SLIDER = true;
    }, this);
  }

  startVeggieSetup(veggie) {
    if (this.gameEnded) {
      return;
    }

    const center = this.world.centerX;
    const height = this.world.height;

    switch (veggie) {
      case 'cucumber':
        this.positionVegetableToChop('cucumber', center, height - 300, 1.1);
        this.setupHittingAnimation();
        break;

      case 'rotten-pepper':
        this.positionVegetableToChop('rotten-pepper', center + 50, height - 380, 1);
        this.setupLeverAnimation();
        DISABLE_HIT = true;
        ENABLE_LEVER = true;
        break;

      case 'rotten-eggplant':
        this.positionVegetableToChop('rotten-eggplant', center + 50, height - 380, 0.7);
        DISABLE_HIT = true;
        ENABLE_SLIDER = true;
        this.playSplashAnimation();
        break;

      default:
        break;
    }

    this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE);
  }

  playChopAnimation() {
    if (this.gameEnded || DISABLE_HIT) {
      return;
    }

    COUNTER += 1;
    this.chop.play();

    if (VEGGIE_NAME !== 'rotten-eggplant' && VEGGIE_NAME !== 'rotten-pepper') {
      // LENGTH OF THE TOTAL AMOUNT OF FRAMES
      TOTAL_CHOP_COUNT = this.currentVeggie.animations.frameTotal;
      this.currentVeggie.kill();

      if (COUNTER <= TOTAL_CHOP_COUNT) {
        this.setupVegetableToChop(VEGGIE_NAME, VEGGIE_XPOS, VEGGIE_YPOS, VEGGIE_SCALE, COUNTER);
      } else {
        this.setupNextVeggie();
        COUNTER = 1;
      }
    }

    if (VEGGIE_NAME === 'rotten-eggplant' && COUNTER === 2) {
      this.playSplashAnimation();
    }
  }

  setupNextVeggie() {
    if (this.gameEnded) {
      return;
    }
    // Add counter to get the next veggie in the array
    VEGGIES_COUNTER += 1;

    if (VEGGIES_COUNTER < this.veggies.length) {
      this.startVeggieSetup(this.veggies[VEGGIES_COUNTER]);
    } else {
      this.state.start('OnboardingEnd');
    }
  }

  slideAwayExplosion() {
    if (!ENABLE_SLIDER) {
      return;
    }

    this.slider.play();

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
      ENABLE_SLIDER = false;
      DISABLE_HIT = false;
      this.splash.kill();
      this.rottenVeggie.kill();
      this.setupNextVeggie();
      COUNTDOWN = 6;
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

  shutdown() {
    super.shutdown();

    Arduino.removeEventListener('drum-hit', this.playChopAnimation);
    Arduino.removeEventListener('lever-pull', this.leverVeggieAway);
    Arduino.removeEventListener('slider-move', this.slideAwayExplosion);

    this.gameEnded = true;
    COUNTER = 1;

    VEGGIES_COUNTER = 0;
    ENABLE_LEVER = false;
    COUNTDOWN = 6;

    ENABLE_SLIDER = false;
    DISABLE_HIT = false;
  }
};
