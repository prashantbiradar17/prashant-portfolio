// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export default function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // run once per browser session to avoid fighting user navigation
    if (sessionStorage.getItem("initialHashHandled")) return;
    sessionStorage.setItem("initialHashHandled", "1");

    if (window.location.hash === "#askme") {
      // replace fragment without reload and scroll to hero
      history.replaceState(null, "", "#hero");
      setTimeout(() => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "auto" });
      }, 50);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
