module.exports = class EventTarget {
  constructor() {
    this.listeners = {};
  }

  addEventListener(type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);

    return this;
  }

  removeEventListener(type, callback) {
    if (!(type in this.listeners)) return;

    const stack = this.listeners[type];
    for (let i = 0, l = stack.length; i < l; i += 1) {
      if (stack[i] === callback) {
        stack.splice(i, 1);
        return;
      }
    }

    // eslint-disable-next-line consistent-return
    return this;
  }

  dispatchEvent(event) {
    if (!(event.type in this.listeners)) return true;

    const stack = this.listeners[event.type];
    for (let i = 0, l = stack.length; i < l; i += 1) {
      stack[i].call(this, event);
    }
    return !event.defaultPrevented;
  }

  on(type, callback) {
    return this.addEventListener(type, callback);
  }
};
