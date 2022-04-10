import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./layouts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
