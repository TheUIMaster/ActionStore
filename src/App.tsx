import React from 'react';
import logo from './logo.svg';
import './App.css';
import  {  useSubscribe } from "./ActionStore";
import {counter} from "./Counter";
export default function App() {
  useSubscribe([counter]);
  console.log("re rendered ");
  return <div className="App">test{ Math.random()} {counter.count}</div>;
}

