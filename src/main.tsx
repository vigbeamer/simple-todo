import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UsernameProvider } from "./components/UsernameProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsernameProvider>
      <App />
    </UsernameProvider>
  </StrictMode>
);
