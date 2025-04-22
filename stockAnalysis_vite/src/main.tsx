import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./container/login/Login.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<App />}></Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
