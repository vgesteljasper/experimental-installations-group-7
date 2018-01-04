module.exports = class Preload extends Phaser.State {
  init() {
    this.game.stage.backgroundColor = '#FF780F';

    this.loader = this.add.sprite(this.world.centerX, this.world.centerY, 'preloader');
    this.loader.anchor.setTo(0.5, 0.5);
  }
  preload() {
    this.load.image('logoFill', 'assets/img/logo-fill-05.png');
    this.load.image('logoBorder', 'assets/img/logo-border-05.png');
    this.load.image('vegetables', 'assets/img/vegetables-05.png');
    this.load.image('choppedVegetables', 'assets/img/chopped-vegetables-05.png');
    this.load.image('knife', 'assets/img/knife-05.png');
    this.load.image('kitchenBackground', 'assets/img/kitchen-background-03.jpg');
    this.load.image('spaghetti', 'assets/img/spaghetti.jpg');
    this.load.image('cucumber', 'assets/img/cucumber.png');
    this.load.image('ok', 'assets/img/ok.png');
    this.load.image('thumbsUp', 'assets/img/thumbs-up.png');
    this.load.image('medal', 'assets/img/medal.png');
    this.load.image('rotten-eggplant', 'assets/img/rotten-eggplant.png');
    this.load.image('pressure-plate', 'assets/img/pressure-plate.png');
    this.load.image('onboarding-end-veggies', 'assets/img/onboarding-end-veggies-04.png');

    this.load.image('choppedTopCucumber', 'assets/img/cucumber-chopped-top.png');
    this.load.image('choppedBottomCucumber', 'assets/img/cucumber-chopped-bottom.png');
    this.load.image('carrot', 'assets/img/carrot.png');
    this.load.image('tomato', 'assets/img/tomato.png');
    this.load.image('rotten-pepper', 'assets/img/rotten-pepper.png');

    this.load.atlasJSONHash(
      'button-comp',
      'assets/img/components/button-comp.png',
      'assets/img/components/button-comp.json',
    );
    this.load.atlasJSONHash(
      'cutting-animation',
      'assets/img/components/cutting-animation.png',
      'assets/img/components/cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'cucumber-cutting-animation',
      'assets/img/components/cucumber-cutting-animation-downsize.png',
      'assets/img/components/cucumber-cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'eggplant-cutting-animation',
      'assets/img/components/eggplant-cutting-animation-downsize.png',
      'assets/img/components/eggplant-cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'carrot-cutting-animation',
      'assets/img/components/carrot-cutting-animation-downsize.png',
      'assets/img/components/carrot-cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'onion-cutting-animation',
      'assets/img/components/onion-cutting-animation-downsize.png',
      'assets/img/components/onion-cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'tomato-cutting-animation',
      'assets/img/components/tomato-cutting-animation-downsize.png',
      'assets/img/components/tomato-cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'paprika-cutting-animation',
      'assets/img/components/paprika-cutting-animation-downsize.png',
      'assets/img/components/paprika-cutting-animation.json',
    );
    this.load.atlasJSONHash(
      'splash-animation',
      'assets/img/components/splash-animation.png',
      'assets/img/components/splash-animation.json',
    );
    this.load.atlasJSONHash(
      'plate-animation',
      'assets/img/components/plate-animation.png',
      'assets/img/components/plate-animation.json',
    );
    this.load.atlasJSONHash(
      'lever-animation',
      'assets/img/components/lever-animation.png',
      'assets/img/components/lever-animation.json',
    );
    this.load.atlasJSONHash(
      'fader-animation',
      'assets/img/components/fader-animation.png',
      'assets/img/components/fader-animation.json',
    );

    this.load.audio('chop', 'assets/audio/chop.mp3');
    this.load.audio('fart', 'assets/audio/fart.mp3');
    this.load.audio('lever', 'assets/audio/lever.mp3');
    this.load.audio('slider', 'assets/audio/slider.mp3');
    this.load.audio('countdown', 'assets/audio/countdown.wav');

    this.load.script('BlurX', 'js/vendors/filter/blurX.js');
    this.load.script('BlurY', 'js/vendors/filter/blurY.js');
  }
  create() {
    this.state.start('OnboardingEnd');
  }
};
