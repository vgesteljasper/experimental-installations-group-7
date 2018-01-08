const Store = require('electron-store');
const electron = require('electron');

const SerialPort = require('serialport');
const EventTarget = require('./EventTarget.js');

const remote = electron.remote;

module.exports = class Arduino extends EventTarget {
  constructor() {
    super();

    const store = new Store();

    const serialport = store.get('serialport');
    const baudrate = Number(store.get('baudrate'));

    if (!serialport || !baudrate) {
      remote.getGlobal('createSettingsWindow')();
    }

    this.port = new SerialPort(serialport, {
      baudRate: baudrate,
    });

    this.onPortData = this.onPortData.bind(this);

    this.port.on('error', this.onPortError);
    this.port.on('open', this.onPortOpened);
    this.port.on('data', this.onPortData);
  }

  onPortError(error) {
    console.error('%c Arduino ', 'background-color:#D97333;color:white;', error.message);
  }

  onPortOpened() {
    console.log('%c Arduino ', 'background-color:#D97333;color:white;', 'port opened');
  }

  onPortData(buffer) {
    const value = buffer.toString('ascii').trim();

    console.log('ARDUINO: ', value);

    // emit event that the drumpad was hit
    if (value.indexOf('d') !== -1) {
      this.dispatchEvent(new Event('drum-hit'));
    }

    // emit event that the spoon was pulled
    if (value.indexOf('l') !== -1) {
      this.dispatchEvent(new Event('lever-pull'));
    }

    // emit event that the slider was moved
    if (value.indexOf('s') !== -1) {
      this.dispatchEvent(new Event('slider-move'));
    }

    // emit event that the pressure plate is active
    if (value.indexOf('1') !== -1) {
      this.dispatchEvent(new CustomEvent('pressure-plate-change', { detail: { active: true } }));
    }

    // emit event that the pressure plate is inactive
    if (value.indexOf('0') !== -1) {
      this.dispatchEvent(new CustomEvent('pressure-plate-change', { detail: { active: false } }));
    }
  }
};
