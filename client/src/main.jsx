import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouteSwitch />
    </QueryClientProvider>
  </React.StrictMode>
);
