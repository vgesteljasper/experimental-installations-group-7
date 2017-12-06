const Button = require('../objects/Button');

module.exports = class Instructions extends Phaser.State {
  create() {
    console.log('[Instructions] — create()');
    this.createaBackground();
    this.createChef();
    this.createInstructions();
    this.createButton();
  }

  createaBackground() {
    console.log('[Menu] — createLogo()');
    this.background = this.add.image(0, 0, 'background');
  }

  createChef() {
    this.chef = this.add.image(20, 105, 'chef');
  }

  createInstructions() {
    // page title
    this.pageTitle = this.add.text(this.world.centerX + 238, 120, 'Instructies', {
      font: '90px circular-medium',
      fill: '#fff',
    });
    this.pageTitle.anchor.setTo(0.5, 0.5);

    // text-bg
    this.textBackground = this.game.add.graphics(0, 0);
    this.textBackground.beginFill(0xffffff, 1);
    this.textBackground.drawRoundedRect(550, 230, 1300, 280, 5);
    this.textBackground.anchor.setTo(0.5, 0.5);

    // highlighter
    this.highlighter = this.game.add.graphics(0, 0);
    this.highlighter.beginFill(0xffaa71, 1);
    this.highlighter.drawRect(652, 320, 282, 5);

    this.instructionText = this.add.text(
      this.world.centerX + 200,
      380,
      `In 60 seconden moet deze spaghetti klaar zijn.
      Zorg dat deze groenten gesneden zijn, maar kijk goed
      naar wat er op je plank ligt. Anders word ik boos.`,
      { font: '50px circular', fill: '#ff780f' },
    );
    this.instructionText.lineSpacing = 15;
    this.instructionText.anchor.setTo(0.5, 0.5);

    this.createVegetableSelection();
  }

  createVegetableSelection() {
    // te snijden groenten
    this.dishText = this.add.text(
      this.world.centerX + 244,
      this.world.centerY + 50,
      'Te snijden groenten:',
      { font: '50px circular', fill: '#fff' },
    );
    this.dishText.anchor.setTo(0.5, 0.5);

    // left dish
    this.dishCircle = this.game.add.graphics(0, 0);
    this.dishCircle.beginFill(0xffaa71, 1);
    this.dishCircle.lineStyle(5, 0xffffff, 1);
    this.dishCircle.drawCircle(this.world.centerX + 44, this.world.centerY + 190, 144);

    // right dish
    this.dishCircle = this.game.add.graphics(0, 0);
    this.dishCircle.beginFill(0xffaa71, 1);
    this.dishCircle.lineStyle(5, 0xffffff, 1);
    this.dishCircle.drawCircle(this.world.centerX + 444, this.world.centerY + 190, 144);

    // cirlce-active
    this.dishCircle = this.game.add.graphics(0, 0);
    this.dishCircle.beginFill(0xffaa71, 1);
    this.dishCircle.lineStyle(10, 0xffffff, 1);
    this.dishCircle.drawCircle(this.world.centerX + 244, this.world.centerY + 190, 144);

    // img
    this.spaghetti = this.add.image(
      this.world.centerX + 244,
      this.world.centerY + 185,
      'spaghetti',
    );
    this.spaghetti.anchor.setTo(0.5, 0.5);
    // mask
    this.mask = this.game.add.graphics(0, 0);
    this.mask.beginFill(0xffffff);
    this.mask.drawCircle(this.world.centerX + 244, this.world.centerY + 190, 144);
    this.spaghetti.mask = this.mask;
  }

  createButton() {
    const buttonPlay = new Button(
      this.game,
      this.world.centerX + 244,
      this.world.height - 150,
      this.buttonPlayClicked,
      this,
      'button',
      'Start',
    );
    buttonPlay.anchor.setTo(0.5, 0.5);
    this.add.existing(buttonPlay);
  }

  buttonPlayClicked() {
    console.log('[Instructions] — handleStart()');
    this.state.start('Play');
  }
};
