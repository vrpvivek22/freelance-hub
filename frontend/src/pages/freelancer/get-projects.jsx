import getFreelancerProjectSearch from "@/services/freelancer/get-projects";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../home/footer";
import timeAgo from "@/utils/time-ago";

function FreelancerProjectSearch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await getFreelancerProjectSearch(searchQuery);
        setProjects(res.projects || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchQuery]);

  if (loading)
    return (
      <p className="flex mt-40 md:mt-65 justify-center font-bold text-gray-700 text-xl md:text-3xl">
        Please wait....
      </p>
    );

  if (projects.length === 0)
    return (
      <p className="flex mt-40 md:mt-65 justify-center font-bold text-red-500 text-xl md:text-3xl">
        No projects found
      </p>
    );

  return (
    <>
      <div className="min-h-screen flex justify-center dark:bg-gray-500 bg-gradient-to-br from-blue-100 to-indigo-100 px-2 md:px-6">
        <div className="dark:bg-gray-900 flex flex-col dark:text-gray-10 space-y-1 mt-2 mb-5 w-full max-w-[1150px]">
          {projects.map((p, index) => (
            <div
              key={index}
              className="px-4 md:pr-14 md:pl-10 py-6 md:py-8 w-full border-[0.5px] shadow-[0_0_6px_rgba(0,0,0,0.2)] cursor-pointer bg-blue-50 dark:hover:bg-gray-600 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all rounded-xl"
              onClick={() => navigate(`/freelancer/bid/${p._id}`)}
            >
              <div className="flex flex-row space-x-6 justify-center">
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-col space-y-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <p className="font-semibold text-lg md:text-2xl text-indigo-700 md:w-[850px]">
                        {p.projectTitle}
                      </p>
                      <div className="text-lg md:text-2xl font-semibold">
                        {p.proposalCount === 1 ? (
                          <p className="flex flex-row gap-2 text-gray-800">
                            <span className="font-semibold">
                              {p.proposalCount}
                            </span>
                            Bid
                          </p>
                        ) : (
                          <p className="flex flex-row gap-2 text-gray-800">
                            <span className="font-semibold">
                              {p.proposalCount}
                            </span>
                            Bids
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row space-x-1">
                      <p className="text-sm md:text-[17px]">
                        Budget -{" "}
                        <span className="font-semibold">$ {p.budget}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <p className="line-clamp-3 w-full md:w-[1050px] overflow-hidden leading-relaxed text-gray-800 text-sm md:text-[16px]">
                      {p.projectDetails}
                    </p>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                      <p className="flex flex-wrap gap-2">
                        {(p.skills || []).map((skill, i) => (
                          <span
                            key={i}
                            className="flex font-semibold items-center text-indigo-700 text-sm md:text-base"
                          >
                            {skill}
                            {i !== p.skills.length - 1 && (
                              <span className="ml-2.5 mr-1.5 opacity-50">
                                •
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                      <p className="font-semibold text-sm md:text-base">
                        {timeAgo(p.createdAt)}
                      </p>
                    </div>
                  </div>
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

export default FreelancerProjectSearch;
