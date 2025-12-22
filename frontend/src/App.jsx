import Home from "./pages/home/main";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/auth-page";

import ClientDashboard from "./pages/client/client-dashboard";
import ClientDetails from "./pages/client/client-details/create-details";
import EditClientDetails from "./pages/client/client-details/update-details";
import PostAProject from "./pages/client/projects/post-project";
import ClientProjectDetails from "./pages/client/projects/getsingle-project";

import FreelancerDashboard from "./pages/freelancer/freelancer-dashboard";
import FreelancerProfile from "./pages/freelancer/freelancer-details/create-freelancer-profile";
import FreelancerProjectDetails from "./pages/freelancer/projects/getsingle-project";

import RoleSelection from "./pages/role/role";

import Aboutus from "./pages/home/header/about";
import EditFreelancerProfile from "./pages/freelancer/freelancer-details/update-profile";
import ClientDetailsPanel from "./pages/client/client-details/get-details";
import ClientProfileSearch from "./pages/client/get-profiles/get-profiles";
import ClientSettings from "./pages/client/settings/settings";
import ClientLayout from "./pages/client/layout/client-layout";
import GetClientProjects from "./pages/client/projects/my-projects";
import FreelancerProfilePanel from "./pages/freelancer/freelancer-details/get-profile";
import GetAllBids from "./pages/freelancer/projects/my-projects";
import FreelancerProjectSearch from "./pages/freelancer/get-projects";
import FreelancerSettings from "./pages/freelancer/settings/settings";
import FreelancerLayout from "./pages/freelancer/layout/freelancer-layout";
import ClientSingleProfileSearch from "./pages/client/get-profiles/get-single-profile";
import EditCLientProject from "./pages/client/projects/edit-project";
import FreelancerSingleProfile from "./pages/freelancer/freelancer-details/get-single-profile";
import GetClientDetails from "./pages/freelancer/get-client-profile";
import FreelancerInvitations from "./pages/freelancer/invites/invites";
import ClientInvitations from "./pages/client/invites/get-invites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/auth" element={<AuthPage />} />

      <Route path="/freelancer/profile" element={<FreelancerProfile />} />
      <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
      <Route
        path="/freelancer/edit/profile"
        element={<EditFreelancerProfile />}
      />

      <Route path="/freelancer" element={<FreelancerLayout />}>
        <Route path="get/profile" element={<FreelancerProfilePanel />} />
        <Route
          path="single/profile/:id"
          element={<FreelancerSingleProfile />}
        />
        <Route path="get/client/details/:id" element={<GetClientDetails />} />
        <Route path="projects" element={<FreelancerProjectSearch />} />
        <Route path="bids" element={<GetAllBids />} />
        <Route path="bid/:projectId" element={<FreelancerProjectDetails />} />
        <Route path="invitations" element={<FreelancerInvitations />} />
        <Route path="settings" element={<FreelancerSettings />} />
      </Route>

      <Route path="/client/details" element={<ClientDetails />} />
      <Route path="/client/dashboard" element={<ClientDashboard />} />
      <Route path="/client/dashboard/post" element={<PostAProject />} />
      <Route path="/client/edit/details" element={<EditClientDetails />} />
      <Route
        path="/client/edit/project/:projectId"
        element={<EditCLientProject />}
      />

      <Route path="/client" element={<ClientLayout />}>
        <Route path="get/details" element={<ClientDetailsPanel />} />
        <Route path="profiles" element={<ClientProfileSearch />} />
        <Route
          path="freelancer/profile/:id"
          element={<ClientSingleProfileSearch />}
        />
        <Route path="projects" element={<GetClientProjects />} />
        <Route path="project/:projectId" element={<ClientProjectDetails />} />
        <Route path="invitations" element={<ClientInvitations />} />
        <Route path="settings" element={<ClientSettings />} />
      </Route>

      <Route path="/RoleSelection" element={<RoleSelection />} />

      <Route path="/api/v1/freelancehub/about" element={<Aboutus />} />
    </Routes>
  );
}

export default App;
