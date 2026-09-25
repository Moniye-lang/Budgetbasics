import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./AboutPage";
import FaqAccordion from "./FaqAccordion";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
