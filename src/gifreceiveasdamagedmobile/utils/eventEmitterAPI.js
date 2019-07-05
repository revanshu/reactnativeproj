/**
 * @class EventEmitter
 * Ex:
 *  const eventEmitter = new EventEmitter();
 */
class EventEmitter {
  constructor() {
    this.events = {
      scanner: new Set(), // to avoid duplicate listeneres for a single event, using Set method
    };
  }

  /**
   * @param {*} eventName
   * @param {*} data
   * @memberof EventEmitter
   */
  emit(eventName, data) {
    console.log(`Event has been emitted.${eventName}`);

    const subscribers = this.events[eventName];
    if (!subscribers) {
      throw new Error(`Invalid event name "${eventName}"`);
    }

    subscribers.forEach((value, key) => {
      key(data);
    });
  }

  /**
   * @param {*} eventName
   * @param {*} callback
   * @returns unsubscribe event function
   * @memberof EventEmitter
   */
  on(eventName, callback) {
    if (!(callback instanceof Function)) {
      throw new Error(
        `please pass the function as a second param: passed typeof param is "${typeof callback}"`,
      );
    }
    console.log(`Event Registered - ${eventName}`);

    const subscribers = this.events[eventName];
    if (!subscribers) {
      throw new Error(`Invalid event name "${eventName}"`);
    }

    subscribers.add(callback);

    return () => {
      subscribers.delete(callback);
    };
  }

  /**
   * @param {*} eventName
   * @memberof EventEmitter
   */
  clear(eventName) {
    const subscribers = this.events[eventName];
    if (!subscribers) {
      throw new Error(`Invalid event name "${eventName}"`);
    }

    subscribers.clear();
  }
}

export default new EventEmitter();
