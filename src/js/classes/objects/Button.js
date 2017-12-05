export default class Button extends Phaser.Button {
  constructor(game, x, y, callback, callbackContext, colorName, label) {
    super(game, x, y, `button-comp`, callback, callbackContext, `${colorName}-normal`, `${colorName}-normal`, `${colorName}-down`);
    this.labelField = new Phaser.Text(game, 0, 2, ``, {font: `circular`, fontSize: `40px`, fill: `#FFF`});
    this.labelField.anchor.setTo(0.5, 0.5);
    this.addChild(this.labelField);
    this.label = label;
  }
  set label(value) {
    this.labelField.text = value;
  }
  get label() {
    return this.labelField.text;
  }
}
