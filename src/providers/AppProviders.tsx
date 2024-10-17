import { RouterProvider } from "react-router-dom";
import router from "../router/Route";

export default function AppProviders() {
  return <RouterProvider router={router} />;
}
