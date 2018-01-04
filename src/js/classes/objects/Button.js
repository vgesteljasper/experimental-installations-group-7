module.exports = class Button extends Phaser.Button {
  constructor(game, x, y, callback, callbackContext, colorName, label, image, generateFrames) {
    super(game, x, y, 'button-comp', callback, callbackContext, `${colorName}-normal`, `${colorName}-normal`, `${colorName}-down`, image, generateFrames);
    this.labelField = new Phaser.Text(game, 0, 2, '', { font: 'circular', fontSize: '40px', fill: '#FFF' });
    this.labelField.anchor.setTo(0.5, 0.5);
    this.addChild(this.labelField);
    this.label = label;

    this.image = this.game.add.sprite(
      -130,
      0,
      `${image}-animation`,
      `${generateFrames}/0001`,
    );
    this.image.anchor.setTo(0.5, 0.5);
    this.image.animations.add('buttonAnimation', Phaser.Animation.generateFrameNames(`${generateFrames}/`, 1, image === 'cutting' ? 5 : 2, '', 4), 2, true, false);
    this.image.scale.setTo(0.25, 0.25);


    if (image === 'cutting') {
      this.image.animations.play('buttonAnimation', 10, true);
    } else {
      this.image.animations.play('buttonAnimation', 5, true);
    }

    if (image === 'cutting') {
      this.plate = this.game.add.sprite(
        -150,
        50,
        'plate-animation',
        'plate/0001',
      );
      this.plate.anchor.setTo(0.5, 0.5);
      this.plate.animations.add('pressure', Phaser.Animation.generateFrameNames('plate/', 1, 5, '', 4), 2, true, false);
      this.plate.scale.setTo(0.2, 0.2);
      this.plate.animations.play('pressure', 10, true);
      this.addChild(this.plate);
    }

    this.addChild(this.image);
  }
  set label(value) {
    this.labelField.text = value;
  }
  get label() {
    return this.labelField.text;
  }
};
