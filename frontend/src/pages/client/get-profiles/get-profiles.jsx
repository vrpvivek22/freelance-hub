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
      <div className="min-h-screen flex justify-center dark:bg-gray-500 bg-gradient-to-br from-blue-100 to-indigo-100 ">
        <div className=" dark:bg-gray-900 flex flex-col dark:text-gray-10 space-y-1 mt-2 mb-15">
          {profiles.map((p, index) => (
            <div
              key={index}
              className="p-6 w-[1150px] border-[0.2px] z-20 shadow-[0_0_6px_rgba(0,0,0,0.2)] bg-blue-50 cursor-pointer hover:scale-[1.01] dark:hover:bg-gray-600 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all rounded-xl"
              onClick={() =>
                navigate(`/client/freelancer/profile/${p.createdBy}`)
              }
            >
              <div className="flex flex-row space-x-6 justify-center">
                <div className="flex flex-row">
                  <img
                    src={
                      p.profileImage ? p.profileImage : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row justify-between">
                      <p className="font-semibold text-2xl">{p.name}</p>
                    </div>
                    <div className="flex flex-row space-x-1">
                      <p className="text-[17px] font-bold">{p.title}</p>
                      <p className="mt-0.5 flex flex-row font-semibold">
                        <span className="mx-2 opacity-50">•</span>
                        <FiMapPin className="mt-1 mr-2" />
                        {p.country}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-[750px] space-y-2">
                    <div className="flex flex-row items-center">
                      <div className="text-black flex flex-row items-center">
                        <p className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-4xl ${
                                i < Math.floor(p.averageRating)
                                  ? "text-pink-700"
                                  : "text-gray-400"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className=" ml-2 mt-1.5 text-xl">
                            {p.averageRating
                              ? Number(p.averageRating).toFixed(1)
                              : "0.0"}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-row mt-1">
                        <p className="ml-3 mr-1 text-2xl opacity-85 mt-0.5">
                          💬
                        </p>
                        <p className="text-xl mt-1">
                          {p.totalReviews ? Number(p.totalReviews) : "0"}
                        </p>
                      </div>
                    </div>
                    <p className="h-21 line-clamp-3 w-full overflow-hidden text-gray-800 leading-relaxed text-[16px]">
                      {p.description}
                    </p>
                    <p className="flex flex-wrap gap-2">
                      {p.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="flex font-semibold items-center"
                        >
                          {skill}
                          {i !== p.skills.length - 1 && (
                            <span className="ml-2.5 mr-1.5 opacity-50">•</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between w-44">
                  <p className="flex flex-row font-bold text-xl my-8">
                    <span className="mx-1">$ {p.hourlyRate}</span>
                    <span className="font-semibold text-[19.5px]">/ hour</span>
                  </p>

                  <button
                    className="bg-indigo-500 text-white font-semibold px-4 my-4 hover:bg-indigo-600 z-100 rounded py-2 cursor-pointer"
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
