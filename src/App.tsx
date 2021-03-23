import React from 'react';
import './App.css';
import  {  useSubscribe } from "./ActionStore";
import {counter} from "./Counter";
export default function App() {
 useSubscribe([counter])
  console.log("re rendered ");
  return <div className="App">APP{} {counter.count}</div>;
}

