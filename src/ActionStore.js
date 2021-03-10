import { useState, useEffect } from "react";

export const action = function (a, b, c) {
  //console.log(c)
  if(typeof a === "object"){
      
  console.log(a, b, c);
  let method = c.value;
  c.value = function () {
    console.log("add list from action");
    method.call(this);
    this.update();
  };
  return c;
}
else{
    
}
};

export default class ActionStore {
  constructor() {
    this.siblings.push(this);
  }
  // static decorate= (obj)=>{
  //   return Object.create(new ActionStore(), obj)
  // }

  // get actions (){
  //   return {
  //     increment: this.increment
  //   }
  // }
  get actions() {
    this.update();
    return this;
  }

  get state() {
    return this;
  }

  subscriptions = [];
  siblings = [];
  clearTimeOut = null;
  subScribe = (func, label) => {
    let subscription = this.subscriptions.find((d) => d.label === label);
    if (!subscription) {
      this.subscriptions.push({ label: label, action: func });
    }
  };
  update = (method, props = [], throttle = 100, updateSiblings = false) => {
    // all changes of state go through this function:
    //if (method && typeof method === "function") {
    //let label = Object.keys(this).findIndex((key) => this[key] === method);
    //console.log(Object.keys(this)[label], props, this);
    method && method(...props);
    this._onUpdate && this._onUpdate();
    this.stateChanged(throttle, updateSiblings);
    // }
  };
  updateAll = () => {};
  unSubscribe = (label) => {
    this.subscriptions = this.subscriptions.filter((d) => d.label !== label);
  };
  stateChanged = (throttle, updateSiblings) => {
    if (!this.clearTimeOut) {
      this.clearTimeOut = window.setTimeout(() => {
        let subScriptions = [];

        if (!updateSiblings) subScriptions = this.subscriptions;
        else
          subScriptions = this.siblings.reduce((a, b, []) =>
            a.push(b.subscriptions)
          );

        subScriptions.forEach((d) => d.action && d.action());

        this.clearTimeOut = null;
      }, throttle);
    }
  };
}

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

export const useSubscribe = (props) => {
  const [refresh, setRefresh] = useState(0);
  const [uniqueCode] = useState(getRandom(8));
  useEffect(() => {
    props.forEach((item) => {
      item.subScribe(() => setRefresh(refresh + 1), uniqueCode);
    });
    return function () {
      // clean up
      props.forEach((item) => item.unSubscribe(uniqueCode));
    };
  }, [refresh]);
};

export const subscribeLit = (props, requestUpdate) => {
  //const [refresh, setRefresh] = useState(0);
  const uniqueCode = getRandom(8);
  //useEffect(() => {
  props.forEach((item) => {
    item.subScribe(() => requestUpdate(), uniqueCode);
  });
  return function () {
    // clean up
    props.forEach((item) => item.unSubscribe(uniqueCode));
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
      let item = this.subscriptions.find((d) => d.label === label);
      if (!item) {
        this.subscriptions.push({ label, action: func });
      }
      return () => {
        this.unSubscribe(label);
      };
    }
    return new Error("function needs to be passed as first parameter");
  };
  unSubscribe = (label) => {
    this.subscriptions = this.subscriptions.filter((d) => d.label !== label);
  };
  run = (...params) => {
    this.subscriptions.forEach((d) => d.action(...params));
  };
}
