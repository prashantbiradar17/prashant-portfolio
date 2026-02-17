import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export default function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Force first paint to hero section instead of restoring last scroll position/hash.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.pathname === "/") {
      window.history.replaceState(null, "", "#hero");

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.getElementById("hero")?.scrollIntoView({ behavior: "auto", block: "start" });
      });
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
