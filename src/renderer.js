// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Make a workaround for Johnny 5
const Readable = require(`stream`).Readable;
class MyStream extends Readable {
  constructor(opts) {
    super(opts);
  }
  _read() {}
}

// hook in our stream
process.__defineGetter__(`stdin`, () => {
  if (process.__stdin) return process.__stdin;
  process.__stdin = new MyStream();
  return process.__stdin;
});
