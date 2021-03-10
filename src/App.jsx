import "./styles.css";
import  {  useSubscribe } from "./ActionStore";
import CounterState from "./Counter";
export default function App() {
  useSubscribe([CounterState]);
  return <div className="App">{CounterState.count}</div>;
}
