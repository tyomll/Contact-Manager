import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App/App";
import { AppProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </AppProvider>
);
