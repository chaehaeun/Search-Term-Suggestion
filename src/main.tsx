import GlobalStyles from "@/globalStyles";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
);
