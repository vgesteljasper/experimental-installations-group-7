const SerialPort = require('serialport');
const EventTarget = require('./EventTarget.js');

module.exports = class Arduino extends EventTarget {
  constructor() {
    super();

    this.port = new SerialPort(process.env.SERIAL_PORT, {
      baudRate: Number(process.env.BAUD_RATE),
    });

    this.port.on('error', this.onPortError);
    this.port.on('open', this.onPortOpened);
    this.port.on('data', this.onPortData);
  }

  onPortError(error) {
    console.log(error.message);
  }

  onPortOpened() {
    console.log('port opened');
  }

  onPortData(buffer) {
    const value = buffer.toString('ascii');

    if (value === 'hit') {
      // emit event that the drumpad was hit
      this.dispatchEvent(new Event('drum-hit'));
    }

    if (value === 'pull') {
      // emit event that the spoon was pulled
      this.dispatchEvent(new Event('spoon-pull'));
    }
  }
};
