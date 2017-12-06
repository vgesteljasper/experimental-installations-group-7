module.exports = class Boot extends Phaser.State {
  preload() {
    console.log('[Boot] — preload()');
    this.load.image('preloader', 'assets/img/preloader.gif');
  }
  create() {
    this.state.start('Preload');
  }
};
