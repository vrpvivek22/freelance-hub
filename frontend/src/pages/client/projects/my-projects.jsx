import completeProjectApi from "@/services/client/complete-project";
import { getClientProjectApi } from "@/services/client/project";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import PostClientReview from "../reviews/post-review";
import Footer from "@/pages/home/footer";
import cancelBidApi from "@/services/client/bid-status/cancelled";

function GetClientProjects() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [reviewedProjects, setReviewedProjects] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const res = await getClientProjectApi();
      setProjects(res.projects);
      setLoading(false);
    }
    load();
  }, []);

  async function handleComplete(bidId) {
    await completeProjectApi(bidId);
    const res = await getClientProjectApi();
    setProjects(res.projects);
  }

  async function handleCancel(bidId) {
    await cancelBidApi(bidId);
    const res = await getClientProjectApi();
    setProjects(res.projects);
  }

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Please wait....
      </p>
    );

  if (projects.length === 0)
    return (
      <p className="flex mt-65 justify-center font-bold text-red-500 text-4xl">
        No Projects found
      </p>
    );

  const filtered = projects.filter((p) => p.status === activeTab);

  return (
    <>
      <div className="flex justify-center min-h-screen bg-gradient-to-br from-gray-100  via-blue-100 to-indigo-100">
        <div className="flex flex-col w-[1155px] mt-8 mb-20 pt-15 pb-20 shadow-[0_0_8px_rgba(0,0,0,0.3)] gap-4 rounded-xl bg-gray-100">
          <div className="flex gap-8 ml-18 mb-3 justify-between">
            <div className="flex gap-6">
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "pending"
                    ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white"
                    : "text-black"
                } `}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "inprogress"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                    : "text-black"
                } `}
                onClick={() => setActiveTab("inprogress")}
              >
                In Progress
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "completed"
                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "incomplete"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveTab("incomplete")}
              >
                In Complete
              </button>
            </div>
            <div>
              <p className="font-bold mr-18 text-3xl">
                Total : {filtered.length}
              </p>
            </div>
          </div>
          <div>
            <div className="px-10">
              <table className=" mt-4 ml-8 w-[1010px]">
                <thead className="bg-indigo-700 h-12  font-normal text-white">
                  <tr className="text-center">
                    <th className="py-3">Project Title</th>
                    <th className={`${activeTab === "incomplete" && "pl-15"}`}>
                      Budget
                    </th>
                    <th className="w-60">
                      {["inprogress", "completed", "incomplete"].includes(
                        activeTab
                      ) ? (
                        <p className="">Freelancer</p>
                      ) : (
                        <p className="">Deadline</p>
                      )}
                    </th>
                    <th>
                      {["inprogress", "completed", "incomplete"].includes(
                        activeTab
                      ) && (
                        <p
                          className={` ${activeTab === "inprogress" && "ml-5"}`}
                        >
                          Bid Amount
                        </p>
                      )}
                    </th>
                    <th>
                      {activeTab === "pending" && (
                        <p className="-ml-30">Status</p>
                      )}
                    </th>
                    <th>Posted On</th>
                    <th>
                      {(activeTab === "inprogress" ||
                        activeTab === "completed" ||
                        activeTab === "pending") && <p>Actions</p>}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.bidId || p.projectId}
                      className="text-center border-1 border-indigo-800"
                    >
                      <td
                        className="w-60"
                        onClick={
                          p.status === "pending"
                            ? () => navigate(`/client/project/${p.projectId}`)
                            : null
                        }
                      >
                        <span className={`overflow-hidden px-4 line-clamp-2`}>
                          <span
                            className={` ${
                              p.status === "pending" &&
                              "hover:text-blue-500 hover:underline cursor-pointer"
                            }`}
                          >
                            {p.projectTitle}
                          </span>
                        </span>
                      </td>
                      <td
                        className={`font-bold ${
                          activeTab === "incomplete" && "pl-15"
                        } `}
                      >
                        $ {p.budget}
                      </td>
                      <td className="py-4 px-4">
                        {["inprogress", "completed", "incomplete"].includes(
                          p.status
                        ) ? (
                          (
                            <p
                              onClick={() => {
                                setOpen(true);
                                setUserEmail(p.freelancerEmail);
                                setUserImage(p.freelancerImage);
                                setUserTitle(p.freelancerTitle);
                                setUserName(p.freelancerName);
                              }}
                            >
                              <span className="flex flex-row gap-2 ml-10 items-center">
                                <img
                                  src={
                                    p.freelancerImage
                                      ? p.freelancerImage
                                      : "/default-avatar.png"
                                  }
                                  className="h-8 w-8 rounded"
                                />
                                <span
                                  className={`${
                                    [
                                      "inprogress",
                                      "completed",
                                      "incomplete",
                                    ].includes(p.status) &&
                                    "hover:text-blue-600 cursor-pointer hover:underline"
                                  } `}
                                >
                                  {p.freelancerName}
                                </span>
                              </span>
                            </p>
                          ) ?? "N/A"
                        ) : (
                          <p>{new Date(p.deadline).toLocaleDateString()}</p>
                        )}
                      </td>
                      <td className="">
                        {p.status === "pending" && (
                          <span className="">{p.status}</span>
                        )}
                      </td>
                      <td>
                        {["inprogress", "completed", "incomplete"].includes(
                          p.status
                        ) && (
                          <span className="font-bold -ml-45">
                            $ {p.bidAmount}
                          </span>
                        )}
                      </td>
                      <td>{new Date(p.postedOn).toLocaleDateString()}</td>

                      <td>
                        {p.status === "pending" && (
                          <button
                            type="button"
                            className="px-6 rounded text-sm py-2 text-white cursor-pointer hover:bg-green-600 bg-green-700 font-semibold"
                            onClick={() =>
                              navigate(`/client/edit/project/${p.projectId}`)
                            }
                          >
                            Edit
                          </button>
                        )}
                        {p.status === "inprogress" && (
                          <>
                            <button
                              type="button"
                              className="px-2 rounded text-sm py-2 mx-4 text-white cursor-pointer hover:bg-green-500 bg-green-600 font-semibold"
                              onClick={() => handleComplete(p.bidId)}
                            >
                              Complete
                            </button>
                            <button
                              type="button"
                              className="px-2 rounded text-sm py-2 text-white cursor-pointer hover:bg-red-500 bg-red-600 font-semibold"
                              onClick={() => handleCancel(p.bidId)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {p.status === "completed" &&
                          (p.hasReviewed || reviewedProjects[p.projectId] ? (
                            <span className="text-gray-800 ml-5 font-semibold">
                              Reviewed{" "}
                              <span className="bg-green-600 text-white px-1.5 py-0.5 rounded-full text-sm">
                                ✓
                              </span>
                            </span>
                          ) : (
                            <button
                              className="px-2 ml-6 text-sm py-2 bg-gradient-to-r from-fuchsia-700 to-fuchsia-600 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-fuchsia-500 rounded font-semibold cursor-pointer text-white"
                              onClick={() => {
                                setSelectedProject(p.projectId);
                                setSelectedFreelancer(p.freelancerId);
                                setOpenModal(true);
                              }}
                            >
                              Leave a review
                            </button>
                          ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="flex mt-60 justify-center font-bold text-red-500 text-4xl">
                  No projects found
                </p>
              )}
              {openModal && (
                <PostClientReview
                  projectId={selectedProject}
                  freelancerId={selectedFreelancer}
                  onClose={() => setOpenModal(false)}
                  onReviewed={() => {
                    setReviewedProjects((prev) => ({
                      ...prev,
                      [selectedProject]: true,
                    }));
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {open && (
          <div className="flex inset-0 fixed bg-black/40 backdrop-blur-[2px] items-center justify-center z-200">
            <div className="flex flex-col relative bg-gradient-to-br from-gray-200 via-blue-200 to-indigo-300 py-5 pl-8 pr-10 rounded-2xl">
              <div className="flex flex-col py-5 px-5">
                <div className="flex flex-row space-x-5 space-y-6 border-b border-gray-900 ">
                  <img
                    src={userImage ? userImage : "/default-avatar.png"}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="flex flex-col space-y-2">
                    <p className="font-semibold text-xl">{userName}</p>
                    <p className="font-bold text-md">{userTitle}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center pt-4">
                  <FiMail className="text-red-800 mt-0.5 mr-1" />
                  <p className="font-semibold">Email:</p>
                  <p className="ml-4">{userEmail}</p>
                </div>
              </div>
              <div>
                <button
                  className="absolute top-2 right-3 font-semibold cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default GetClientProjects;
