import { useAuth } from "@/context/authcontext";
import { useRefresh } from "@/context/Refresh-context";
import getProjectProposalApi from "@/services/client/proposal";
import getDays from "@/utils/get-days";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ProjectProposals({ projectId }) {
  const { user } = useAuth();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refresh } = useRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getProjectProposalApi(projectId);
      setProposals(res.proposals);
      setLoading(false);
    }
    if (projectId) {
      load();
    }
  }, [projectId]);

  if (loading)
    return (
      <p className="flex mt-60 justify-center font-bold text-gray-700 text-3xl">
        Please wait....
      </p>
    );

  if (proposals.length === 0)
    return (
      <p className="flex mt-60 justify-center font-bold text-gray-700 text-3xl">
        No proposals yet
      </p>
    );

  return (
    <div className="flex flex-col mt-4 justify-center">
      <p className="flex flex-row absolute right-65 items-center gap-2 top-40">
        {proposals.length === 1 ? (
          <p className="flex flex-row gap-2 text-gray-800">
            <span className="font-bold -mt-1 text-3xl">{proposals.length}</span>{" "}
            <span className="text-2xl">Bid</span>
          </p>
        ) : (
          <p className="flex flex-row gap-2 text-gray-800">
            <span className="font-bold -mt-1 text-3xl">{proposals.length}</span>{" "}
            <span className="text-2xl"> Bids</span>
          </p>
        )}
      </p>
      <div className="w-full">
        <div className=" dark:bg-gray-900 flex flex-col dark:text-gray-100 space-y-2">
          {proposals.map((p) => (
            <div key={p._id || p.bidId}>
              <div className="flex flex-row space-x-2 rounded-xl py-8 pl-8 pr-10 bg-gray-100 shadow-[0_0_6px_rgba(0,0,0,0.2)]">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-4 mb-4">
                    <div>
                      <img
                        src={
                          p.freelancerImage
                            ? p.freelancerImage
                            : "/default-avatar.png"
                        }
                        alt="Profile"
                        className="w-27 h-27 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 mt-0.5">
                      <div className="flex flex-row ml-1">
                        <p
                          className="font-semibold text-2xl cursor-pointer hover:text-blue-600"
                          onClick={() => {
                            if (p.freelancerId === user.id) {
                              navigate("/freelancer/get/profile");
                            } else {
                              navigate(
                                `/freelancer/single/profile/${p.freelancerId}`
                              );
                            }
                          }}
                        >
                          {p.freelancerName}
                        </p>
                      </div>
                      <div className="flex flex-row space-x-2 mt-1 ml-1">
                        <p className="text-[18px] font-bold">
                          {p.freelancerTitle}
                        </p>
                        <span className="opacity-50 mt-0.5">•</span>
                        <FiMapPin className="mt-1.5" />
                        <p className="mt-0.5 font-semibold">
                          {p.freelancerCountry}{" "}
                        </p>
                      </div>
                      <div className="flex flex-row items-center ">
                        <p className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-3xl ${
                                i < Math.floor(p.freelancerRating)
                                  ? "text-pink-700"
                                  : "text-gray-400"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className=" ml-2 mt-1 text-xl">
                            {p.freelancerRating
                              ? Number(p.freelancerRating).toFixed(1)
                              : "0.0"}
                          </span>
                        </p>

                        <span className="ml-3 mr-1 mt-1 text-2xl opacity-85">
                          💬
                        </span>
                        <p className="text-lg mt-1.5">
                          {p.freelancerTotalReviews
                            ? Number(p.freelancerTotalReviews)
                            : "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-[930px] px-1 space-y-4">
                    <p className="whitespace-pre-line text-[16px] leading-relaxed text-gray-700">
                      {p.coverLetter}
                    </p>
                    <div className="flex flex-row justify-between">
                      <p className="flex flex-wrap gap-2">
                        {p.freelancerSkills.map((skill, i) => (
                          <span
                            key={i}
                            className="flex font-semibold items-center"
                          >
                            {skill}
                            {i !== p.freelancerSkills.length - 1 && (
                              <span className="ml-2.5 mr-1.5 opacity-50">
                                •
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between w-44">
                  <div className="flex flex-col mt-3">
                    <div className="flex flex-row">
                      <span className="mx-1 font-bold text-xl">
                        $ {p.bidAmount}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="font-semibold text-sm">
                        {getDays(p.projectDelivery) || ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProjectProposals;
