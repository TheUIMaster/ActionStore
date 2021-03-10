import ActionStore, { action } from "./ActionStore";

class Counter extends ActionStore {
  #count = 0;

  get count() {
    return this.#count;
  }

  @action
  increment () {
    this.#count++;
  }
  
  
}

export let counter =  new Counter();

setInterval(()=>{
    counter.increment(); 
    counter.actions.increment(); 
    counter.update(counter.increment)
}, 1000); 