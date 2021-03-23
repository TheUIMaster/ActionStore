import ActionStore, { action } from "./ActionStore";

class Counter extends ActionStore {
  #count = 0;

  get count() {
    return this.#count;
  }

  @action
  increment () {
    // mutating the object
    this.#count++;
  }
  
  
}

export let counter =  new Counter();

setInterval(()=>{
    counter.increment(); 
    console.log(counter.count);
}, 1000); 

