import { useEffect, useState } from "react";
import GetFreelancerInvitesApi from "@/services/freelancer/invites";
import Footer from "@/pages/home/footer";
import timeAgo from "@/utils/time-ago";
import { useNavigate } from "react-router-dom";

function FreelancerInvitations() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await GetFreelancerInvitesApi();
        setInvites(res.invitations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, []);

  if (loading) return <p>Loading invites...</p>;

  return (
    <div className="min-h-screen justify-center dark:bg-gray-500 bg-gradient-to-br from-blue-100 to-indigo-100 ">
      {invites.length === 0 ? (
        <p>No invitations sent yet</p>
      ) : (
        <>
          <div className="min-h-screen flex justify-center dark:bg-gray-500 bg-gradient-to-br from-blue-100 to-indigo-100 ">
            <div className=" dark:bg-gray-900 flex flex-col dark:text-gray-10 space-y-1 mt-2 mb-5 ">
              <h2 className="text-xl font-semibold mb-4">My Invitations</h2>
              {invites.map((p, index) => (
                <div
                  key={index}
                  className="pr-14 pl-10 py-8 w-[1150px] border-[0.5px] shadow-[0_0_6px_rgba(0,0,0,0.2)] cursor-pointer bg-blue-50 dark:hover:bg-gray-600 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all rounded-xl"
                  onClick={() =>
                    navigate(`/freelancer/bid/${p.projectId?._id}`)
                  }
                >
                  <div className="flex flex-row space-x-6 justify-center">
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-row justify-between">
                          <p className="font-semibold text-2xl text-indigo-700 w-[850px]">
                            {p.projectId?.projectTitle}
                          </p>
                          <div className="text-2xl font-semibold ml-5">
                            {p.projectId?.proposalCount === 1 ? (
                              <p className="flex flex-row gap-2 text-gray-800">
                                <span className="font-semibold ">
                                  {p.projectId?.proposalCount}
                                </span>{" "}
                                Bid
                              </p>
                            ) : (
                              <p className="flex flex-row gap-2 text-gray-800">
                                <span className="font-semibold">
                                  {p.projectId?.proposalCount}
                                </span>{" "}
                                Bids{" "}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row space-x-1">
                          <p className="text-[17px] ">
                            Budget -{" "}
                            <span className="font-semibold">
                              ${p.projectId?.budget}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <p className="h-21 line-clamp-3 w-[1050px] overflow-hidden leading-relaxed text-gray-800 text-[16px]">
                          {p.projectId?.projectDetails}
                        </p>
                        <div className="flex flex-row justify-between">
                          <p className="flex flex-wrap gap-2  w-4xl">
                            {(p.projectId?.skills || []).map((skill, i) => (
                              <span
                                key={i}
                                className="flex font-semibold items-center text-indigo-700"
                              >
                                {skill}
                                {i !== p.projectId?.skills.length - 1 && (
                                  <span className="ml-2.5 mr-1.5 opacity-50">
                                    •
                                  </span>
                                )}
                              </span>
                            ))}
                          </p>
                          <p className="mt-1 font-semibold">
                            {timeAgo(p.projectId?.createdAt)}
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
      )}
    </div>
  );
}

export default FreelancerInvitations;
