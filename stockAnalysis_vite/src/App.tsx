import { useEffect } from "react";
import "./App.css";
import Dashboard from "./container/Dashboard";

function App() {
  useEffect(() => {}, []);
  return (
    <div>
      {/* <CandleStickChart /> */}
      <Dashboard />
    </div>
  );
}

export default App;
