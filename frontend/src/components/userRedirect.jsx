import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDetailsByUserIdApi } from "@/services/client/client-details";
import { getProfileByUserIdApi } from "@/services/freelancer/freelancer-profile";
import { useAuth } from "@/context/authcontext";

function UserRedirect({ role }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  localStorage.setItem("role", role);

  useEffect(() => {
    async function handleRedirect() {
      if (!user) return;
      try {
        if (role === "client") {
          const res = await getDetailsByUserIdApi(user.id);
          const details = res.details;

          if (!details || !details.name || details.name.trim() === "") {
            navigate("/client/details", { replace: true });
          } else {
            navigate("/client/dashboard", { replace: true });
          }
        } else if (role === "freelancer") {
          const res = await getProfileByUserIdApi(user.id);
          const profile = res.profile;
          if (!profile || !profile.name || profile.name.trim() === "") {
            navigate("/freelancer/profile", { replace: true });
          } else {
            navigate("/freelancer/dashboard", { replace: true });
          }
        } else {
          console.warn("unknown role:", role);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    }

    handleRedirect();
  }, [user, role, navigate]);

  return null;
}

export default UserRedirect;
