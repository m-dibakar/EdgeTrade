import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { LANDING_URL } from "./config";

// Accept the login handoff from the landing app (?token=...&username=...)
const params = new URLSearchParams(window.location.search);
if (params.get("token")) {
  localStorage.setItem("token", params.get("token"));
  localStorage.setItem("username", params.get("username") || "");
  window.history.replaceState({}, "", window.location.pathname);
}

if (!localStorage.getItem("token")) {
  window.location.replace(`${LANDING_URL}/login`);
} else {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
}
