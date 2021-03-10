import React from 'react';
import logo from './logo.svg';
import './App.css';
import  {  useSubscribe } from "./ActionStore";
import {counter} from "./Counter";
export default function App() {
  useSubscribe([counter]);
  return <div className="App">{counter.count}</div>;
}

