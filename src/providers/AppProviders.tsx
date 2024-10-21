import { RouterProvider } from "react-router-dom";
import router from "../router/Route";
import DataVoluntarioContextProvider from "./context/DataVolutarioContext";

export default function AppProviders() {
  return (
    <DataVoluntarioContextProvider>
      <RouterProvider router={router} />
    </DataVoluntarioContextProvider>
  );
}
