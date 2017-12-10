const Button = require('../objects/Button');

let TOTALCHOPCOUNT;
let COUNTER = 1;
let VEGGIESCOUNTER = 0;

let randomVeggies = [];
let VEGGIEBEINGCUT = '';
let VEGGIENAME = '';
let VEGGIEXPOS = '';
let VEGGIEYPOS = '';
let VEGGIESCALE = '';

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
    VEGGIEBEINGCUT = randomVeggies[VEGGIESCOUNTER];
    console.log('[createRandomOrder]', randomVeggies);
    this.setupVeggie(VEGGIEBEINGCUT);
  }

  setupVeggie(veggie) {
    console.log('[setupVeggie]', veggie);
    if (veggie === 'eggplant') {
      VEGGIENAME = 'eggplant';
      VEGGIEXPOS = this.world.centerX + 50;
      VEGGIEYPOS = this.world.height - 350;
      VEGGIESCALE = 0.25;
      this.setupVegetableToChop(VEGGIENAME, VEGGIEXPOS, VEGGIEYPOS, VEGGIESCALE, 1, 2);
    } else if (veggie === 'carrot') {
      VEGGIENAME = 'carrot';
      VEGGIEXPOS = this.world.centerX + 50;
      VEGGIEYPOS = this.world.height - 300;
      VEGGIESCALE = 0.25;
      this.setupVegetableToChop(VEGGIENAME, VEGGIEXPOS, VEGGIEYPOS, VEGGIESCALE, 1, 2);
    } else if (veggie === 'onion') {
      VEGGIENAME = 'onion';
      VEGGIEXPOS = this.world.centerX;
      VEGGIEYPOS = this.world.height - 400;
      VEGGIESCALE = 0.2;
      this.setupVegetableToChop(VEGGIENAME, VEGGIEXPOS, VEGGIEYPOS, VEGGIESCALE, 1, 2);
    } else if (veggie === 'cucumber') {
      VEGGIENAME = 'cucumber';
      VEGGIEXPOS = this.world.centerX;
      VEGGIEYPOS = this.world.centerY + 300;
      VEGGIESCALE = 0.3;
      this.setupVegetableToChop(VEGGIENAME, VEGGIEXPOS, VEGGIEYPOS, VEGGIESCALE, 1, 2);
    } else if (veggie === 'paprika') {
      VEGGIENAME = 'paprika';
      VEGGIEXPOS = this.world.centerX + 180;
      VEGGIEYPOS = this.world.height - 300;
      VEGGIESCALE = 0.3;
      this.setupVegetableToChop(VEGGIENAME, VEGGIEXPOS, VEGGIEYPOS, VEGGIESCALE, 1, 2);
    } else if (veggie === 'tomato') {
      VEGGIENAME = 'tomato';
      VEGGIEXPOS = this.world.centerX;
      VEGGIEYPOS = this.world.height - 380;
      VEGGIESCALE = 0.2;
      this.setupVegetableToChop(VEGGIENAME, VEGGIEXPOS, VEGGIEYPOS, VEGGIESCALE, 1, 2);
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

  setupVegetableToChop(name, posX, posY, scale, frameStart, frameStartFrame) {
    console.log('[setupVegetableToChop]', name, posX, posY, scale, frameStart, frameStartFrame);
    this.currentVeggie = this.add.sprite(posX, posY, `${name}-cutting-animation`, `${name}/chop/000${frameStart}`);
    this.currentVeggie.anchor.setTo(0.5, 0.5);
    this.currentVeggie.animations.add('chop', Phaser.Animation.generateFrameNames(`${name}/chop/`, `${frameStart}`, `${frameStartFrame}`, '', 4), 10, true, false);
    this.currentVeggie.scale.setTo(scale, scale);

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

  PlayChopAnimation() {
    // console.log('[PlayChopAnimation]', this.currentVeggie.animations);

    // LENGTH OF THE TOTAL AMOUNT OF FRAMES
    TOTALCHOPCOUNT = this.currentVeggie.animations.frameTotal;
    // console.log('[PlayChopAnimation]', TOTALCHOPCOUNT);

    COUNTER += 1;

    this.currentVeggie.animations.play('chop', 10, false);
    this.currentVeggie.events.onAnimationComplete.add((e) => {
      e.kill();
      if (COUNTER <= TOTALCHOPCOUNT) {
        this.setupVegetableToChop(
          VEGGIENAME,
          VEGGIEXPOS,
          VEGGIEYPOS,
          VEGGIESCALE,
          COUNTER,
          COUNTER + 1,
        );
      } else {
        this.setupNextVeggie();
        COUNTER = 1;
      }
    }, this);
  }

  setupNextVeggie() {
    console.log('[Play] — setupNextVeggie()');
    // global counter die elke keer 1tje omhoog gaat bij next veggie,
    // -> als  global counter === arr.length dan is spel gedaan

    // Add counter to get the next veggie in the array
    VEGGIESCOUNTER += 1;
    console.log('[setupNextVeggie]', randomVeggies[VEGGIESCOUNTER]);

    if (VEGGIESCOUNTER < randomVeggies.length) {
      console.log('[setupNextVeggie]', VEGGIESCOUNTER, randomVeggies.length);
      this.setupVeggie(randomVeggies[VEGGIESCOUNTER]);
    } else {
      this.state.start('End');
      console.log('[setupNextVeggie]', 'END GAME');
    }
  }

  update() {
    console.log('[Play] — Update()');
  }
};
