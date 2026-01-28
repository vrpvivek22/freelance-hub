import { useEffect, useState } from "react";
import { GetClientInvitesApi } from "@/services/client/invites";
import Footer from "@/pages/home/footer";
import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ClientInvitations() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await GetClientInvitesApi();
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="p-6 flex flex-col pl-46 justify-center ">
          <h2 className="text-3xl ml-2 font-bold my-6">
            Freelancers You’ve Invited
          </h2>

          {invites.length === 0 ? (
            <p className="flex mt-55 justify-center font-bold text-red-500 text-4xl">
              No invitations sent yet
            </p>
          ) : (
            <>
              <div className="space-y-1 max-w-6xl mb-20">
                {invites.map((invite) => (
                  <div
                    key={invite._id}
                    className="p-6 w-[1150px] border-[0.2px] z-20 shadow-[0_0_6px_rgba(0,0,0,0.2)] bg-blue-50 cursor-pointer hover:scale-[1.01] dark:hover:bg-gray-600 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all rounded-xl"
                    onClick={() =>
                      navigate(
                        `/client/freelancer/profile/${invite.freelancer._id}`,
                      )
                    }
                  >
                    <p className="p-2 text-xl text-gray-700 mb-3">
                      <strong>
                        Invited for: {invite.projectId?.projectTitle}
                      </strong>
                    </p>

                    <div className="flex flex-row space-x-6 justify-center">
                      <div className="flex flex-row">
                        <img
                          src={
                            invite.freelancer.profileImage
                              ? invite.freelancer.profileImage
                              : "/default-avatar.png"
                          }
                          alt="Profile"
                          className="w-28 h-28 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <div className="flex flex-col space-y-2">
                          <div className="flex flex-row justify-between">
                            <p className="font-semibold text-2xl">
                              {invite.freelancer.name}
                            </p>
                          </div>
                          <div className="flex flex-row space-x-1">
                            <p className="text-[17px] font-bold">
                              {invite.freelancer.title}
                            </p>
                            <p className="mt-0.5 flex flex-row font-semibold">
                              <span className="mx-2 opacity-50">•</span>
                              <FiMapPin className="mt-1 mr-2" />
                              {invite.freelancer.country}{" "}
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
                                      i <
                                      Math.floor(
                                        invite.freelancer.averageRating,
                                      )
                                        ? "text-pink-700"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    ★
                                  </span>
                                ))}
                                <span className=" ml-2 mt-1.5 text-xl">
                                  {invite.freelancer.averageRating
                                    ? Number(
                                        invite.freelancer.averageRating,
                                      ).toFixed(1)
                                    : "0.0"}
                                </span>
                              </p>
                            </div>
                            <div className="flex flex-row mt-1">
                              <p className="ml-3 mr-1 text-2xl opacity-85 mt-0.5">
                                💬
                              </p>
                              <p className="text-xl mt-1">
                                {invite.freelancer.totalReviews
                                  ? Number(invite.freelancer.totalReviews)
                                  : "0"}
                              </p>
                            </div>
                          </div>
                          <p className="h-21 line-clamp-3 w-full overflow-hidden text-gray-800 leading-relaxed text-[16px]">
                            {invite.freelancer.description}
                          </p>
                          <p className="flex flex-wrap gap-2">
                            {invite.freelancer.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="flex font-semibold items-center"
                              >
                                {skill}
                                {i !== invite.freelancer.skills.length - 1 && (
                                  <span className="ml-2.5 mr-1.5 opacity-50">
                                    •
                                  </span>
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-between w-44">
                        <p className="flex flex-row font-bold text-2xl my-8">
                          <span className="mx-1">
                            $ {invite.freelancer.hourlyRate}
                          </span>
                          <span className="font-semibold text-[23px]">
                            / hour
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ClientInvitations;
