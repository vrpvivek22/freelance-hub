import getClientProfileSearch from "@/services/client/get-profiles";
import { useEffect, useState } from "react";
import Footer from "../../home/footer";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import ClientInviteApi from "@/services/client/invites";
import { getClientProjectApi } from "@/services/client/project";

function ClientProfileSearch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  const [profiles, setProfiles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await getClientProjectApi();
        setProjects(res.projects);
      } catch (err) {
        console.log("failed to fetch projects", err);
      } finally {
        setProjectsLoading(false);
      }
    }
    load();
  }, []);

  const filtered = projects.filter((p) => p.status === "pending");

  const pendingProjectId = filtered[0]?.projectId;

  useEffect(() => {
    async function load() {
      try {
        setProfilesLoading(true);
        const res = await getClientProfileSearch(searchQuery);
        setProfiles(res.profiles || []);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
        setProfiles([]);
      } finally {
        setProfilesLoading(false);
      }
    }
    load();
  }, [searchQuery]);

  if (profilesLoading || projectsLoading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Please wait....
      </p>
    );

  if (profiles.length === 0)
    return (
      <p className="flex mt-65 justify-center font-bold text-red-500 text-3xl">
        No profiles found
      </p>
    );

  return (
    <>
      <div className="min-h-screen flex justify-center bg-gradient-to-br from-blue-100 to-indigo-100 px-3 sm:px-6">
        <div className="flex flex-col space-y-3 lg:space-y-1 mt-4 lg:mt-2 mb-12 w-full max-w-[1200px]">
          {profiles.map((p, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 w-full border-[0.2px] shadow-[0_0_6px_rgba(0,0,0,0.2)] bg-blue-50 cursor-pointer hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all rounded-xl"
              onClick={() =>
                navigate(`/client/freelancer/profile/${p.createdBy}`)
              }
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex justify-center lg:justify-start">
                  <img
                    src={p.profileImage || "/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col flex-1 space-y-3">
                  <div>
                    <p className="font-semibold text-xl sm:text-2xl">
                      {p.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[16px] font-semibold">
                      <span>{p.title}</span>
                      <span className="opacity-50">•</span>
                      <FiMapPin />
                      <span>{p.country}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-3xl ${
                            i < Math.floor(p.averageRating)
                              ? "text-pink-700"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-lg">
                        {p.averageRating
                          ? Number(p.averageRating).toFixed(1)
                          : "0.0"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-xl">💬</span>
                      <span className="ml-1 text-lg">
                        {p.totalReviews || "0"}
                      </span>
                    </div>
                  </div>

                  <p className="line-clamp-3 text-gray-800 leading-relaxed text-[15px] sm:text-[16px]">
                    {p.description}
                  </p>

                  <p className="flex flex-wrap gap-2 font-semibold">
                    {p.skills.map((skill, i) => (
                      <span key={i}>
                        {skill}
                        {i !== p.skills.length - 1 && (
                          <span className="mx-2 opacity-50">•</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="flex flex-row lg:flex-col items-center justify-between lg:w-44 gap-4">
                  <p className="font-bold text-xl">
                    $ {p.hourlyRate}
                    <span className="font-semibold text-[18px]"> / hour</span>
                  </p>

                  <button
                    className="bg-indigo-500 text-white font-semibold px-4 py-2 hover:bg-indigo-600 rounded"
                    type="button"
                    onClick={async (e) => {
                      e.stopPropagation();

                      if (!pendingProjectId) {
                        alert("No pending project found");
                        return;
                      }

                      try {
                        await ClientInviteApi({
                          projectId: pendingProjectId,
                          freelancerId: p.createdBy,
                        });
                        alert("Invitation sent successfully!");
                      } catch (err) {
                        alert(err.response?.data?.message || "Invite failed");
                      }
                    }}
                  >
                    Invite to Bid
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ClientProfileSearch;
