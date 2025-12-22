import { Outlet } from "react-router-dom";
import ClientHeader from "../client-header";

function ClientLayout() {
  return (
    <>
      <ClientHeader />
      <Outlet />
    </>
  );
}

export default ClientLayout;
