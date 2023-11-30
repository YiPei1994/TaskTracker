import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TaskTrackerContextProvider } from "./useTracker";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <TaskTrackerContextProvider>
        <App />
      </TaskTrackerContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
