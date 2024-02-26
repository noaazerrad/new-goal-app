import logo from "./logo.svg";

import "./App.css";
import Goals from "./Goals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Goal from "./Goal";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Goals />} />
          <Route path="goal/:id" element={<Goal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
