import { Outlet } from "react-router-dom";
import FreelancerHeader from "../freelancer-header";

function FreelancerLayout() {
  return (
    <>
      <FreelancerHeader />
      <Outlet />
    </>
  );
}

export default FreelancerLayout;
