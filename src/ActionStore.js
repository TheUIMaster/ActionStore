import { useState, useEffect } from "react";

export const action = function (a, b, c) {
  //console.log(c)
  if (typeof a === "object") {
    console.log(a, b, c);
    let method = c.value;
    c.value = function () {
      console.log("add list from action");
      method.call(this);
      update.call(this);
      return this;
    };
    return c;
  } else {
  }
};

export default class ActionStore {
  _ = { subscriptions: [], clearTimeOut: null };
}

export let subScribe = function (func, label) {
  debugger;
  let subscription = this._.subscriptions.find((d) => d.label === label);
  if (!subscription) {
    this._.subscriptions.push({ label: label, action: func });
  }
};
export let update = function (
  method,
  props = [],
  throttle = 100,
  updateSiblings = false
) {
  method && method.apply(this, props);
  this._onUpdate && this._onUpdate();
  stateChanged.call(this, throttle, updateSiblings);
};
export let updateAll = () => {};
export let unSubscribe = function (label) {
  this._.subscriptions = this._.subscriptions.filter((d) => d.label !== label);
};
export let stateChanged = function (throttle, updateSiblings) {
  if (!this._.clearTimeOut) {
    this._.clearTimeOut = window.setTimeout(() => {
      let subScriptions = [];

      if (!updateSiblings) subScriptions = this._.subscriptions;
      else
        subScriptions = this.siblings.reduce((a, b, []) =>
          a.push(b.subscriptions)
        );

      subScriptions.forEach(
        (d) => d.action && typeof d.action === "function" && d.action()
      );

      this._.clearTimeOut = null;
    }, throttle);
  }
};
export const getRandom = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const useSubscribe = function (props) {
  const [refresh, setRefresh] = useState(0);
  const [uniqueCode] = useState(getRandom(8));
  useEffect(() => {
    props.forEach((item) => {
      subScribe.call(item, () => setRefresh(refresh + 1), uniqueCode);
    });
    return function () {
      // clean up
      props.forEach((item) => unSubscribe.call(item, uniqueCode));
    };
  }, [refresh]);
};

export const subscribeLit = function (props, requestUpdate) {
  //const [refresh, setRefresh] = useState(0);
  const uniqueCode = getRandom(8);
  //useEffect(() => {
  props.forEach((item) => {
    subScribe.call(item, () => requestUpdate(), uniqueCode);
  });
  return function () {
    // clean up
    props.forEach((item) => unSubscribe.call(item, uniqueCode));
  };
  //}, [refresh]);
};

export class Action {
  name = "";
  constructor(name) {
    this.name = name;
  }
  subscriptions = [];
  subscribe = (func, label) => {
    if (func && typeof func === "function") {
      if (!label) {
        label = getRandom(10);
      }
      let item = this._.subscriptions.find((d) => d.label === label);
      if (!item) {
        this._.subscriptions.push({ label, action: func });
      }
    }
    return new Error("function needs to be passed as first parameter");
  };
  unSubscribe = (label) => {
    this._.subscriptions = this._.subscriptions.filter(
      (d) => d.label !== label
    );
  };
  run = (...params) => {
    this._.subscriptions.forEach((d) => d.action(...params));
  };
}
