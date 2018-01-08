module.exports = class SuperState extends Phaser.State {
  create() {
    this.pressurePlateStateChange = this.pressurePlateStateChange.bind(this);
    this.game.input.keyboard.addKey(Phaser.KeyCode.P).onUp.add(this.pressurePlateStateChange, this);
    Arduino.addEventListener('pressure-plate-change', this.pressurePlateStateChange);
  }

  pressurePlateStateChange(e) {
    const state = e.detail.active;
    console.log('SuperState', { state });

    if (!state) {
      this.state.start('Menu');
    }
  }

  shutdown() {
    Arduino.removeEventListener('pressure-plate-change', this.goToMenuState);
  }
};
