import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
]);

export default router;
