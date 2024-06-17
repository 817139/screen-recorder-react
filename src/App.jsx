import { useState } from "react";
import "./App.css";
import ScreenRecorder from "./ScreenRecorder";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <ScreenRecorder />
      </div>
    </>
  );
}

export default App;
