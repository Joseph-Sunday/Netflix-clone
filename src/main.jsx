import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/App.css";
import App from "./App";
import { ListProvider } from "./context/ListContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ListProvider>
        <App />
      </ListProvider>
    </BrowserRouter>
  </StrictMode>
);
