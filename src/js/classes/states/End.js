const Button = require('../objects/Button');

module.exports = class End extends Phaser.State {
  create() {
    console.log('[Instructions] — create()');
    this.createaBackground();
    this.createChef();
    this.createInstructions();
    this.createWebcam();
    this.createButton();
  }

  createaBackground() {
    console.log('[Menu] — createLogo()');
    this.background = this.add.image(0, 0, 'background');
  }

  createChef() {
    this.chef = this.add.image(20, 105, 'chef');

    // create smileyface
    this.smile = this.add.graphics(0, 0);

    this.smile.lineStyle(4, 0x8c6846, 1);
    // happy
    this.smile.arc(320, 640, 35, this.game.math.degToRad(0), this.game.math.degToRad(180), false);

    // sad
    // this.smile.arc(320, 660, 35, this.game.math.degToRad(0), this.game.math.degToRad(180), true);

    console.log('[createChef()]', this.smile);
  }

  createInstructions() {
    // page title
    this.pageTitle = this.add.text(this.world.centerX + 238, 120, 'Hoera!', { font: '90px circular-medium', fill: '#fff' });
    this.pageTitle.anchor.setTo(0.5, 0.5);

    // text-bg
    this.textBackground = this.game.add.graphics(0, 0);
    this.textBackground.beginFill(0xffffff, 1);
    this.textBackground.drawRoundedRect(550, 230, 1300, 280, 5);
    this.textBackground.anchor.setTo(0.5, 0.5);

    this.instructionText = this.add.text(
      this.world.centerX + 200, 380,
      `
      Je behaalde 105 punten. Neem een foto van jezelf
      voor op het scorebord.
      `,
      { font: '50px circular', fill: '#ff780f' },
    );
    this.instructionText.lineSpacing = 15;
    this.instructionText.anchor.setTo(0.5, 0.5);
  }

  createWebcam() {
    this.webcam = this.game.add.graphics(0, 0);
    this.webcam.beginFill(0xffaa71, 1);
    this.webcam.lineStyle(5, 0xFFFFFF, 1);
    this.webcam.drawRoundedRect(870, 550, 650, 300, 5);
  }

  createButton() {
    const buttonPlay = new Button(this.game, this.world.centerX + 244, this.world.height - 150, this.buttonPlayClicked, this, 'button', 'Say Cheese');
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  buttonPlayClicked() {
    console.log('[Instructions] — handleStart()');
    this.state.start('Play');
  }
};
