import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage.tsx";
import Display from "./routes/Display.tsx";
import MeatDisplay1 from "./routes/MeatDisplay1.tsx";
import MeatDisplay2 from "./routes/MeatDisplay2.tsx";
import RestaurantDisplay from "./routes/RestaurantDisplay.tsx";
import ProduceDisplay from "./routes/ProduceDisplay.tsx";
import { meatItemLoader } from "./loaders/meatItemLoader.ts";

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Display },
      { path: "meat1", Component: MeatDisplay1, loader: meatItemLoader },
      { path: "meat2", Component: MeatDisplay2 },
      { path: "restaurant", Component: RestaurantDisplay },
      { path: "produce", Component: ProduceDisplay },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
