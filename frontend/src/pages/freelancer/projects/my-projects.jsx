import { useRefresh } from "@/context/Refresh-context";
import { deleteBidApi, getAllbidsApi } from "@/services/freelancer/bids";
import { useEffect, useState } from "react";
import PostFreelancerReview from "../reviews/post-review";
import Footer from "@/pages/home/footer";
import { useNavigate } from "react-router-dom";

function GetAllBids() {
  const [bids, setBids] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [reviewedProjects, setReviewedProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const { refreshFlag } = useRefresh();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await getAllbidsApi();
        setBids(res.bids);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [refreshFlag]);

  async function handleDelete(bidId) {
    try {
      await deleteBidApi(bidId);
      setBids((prev) => prev.filter((b) => b.bidId !== bidId));
    } catch (error) {
      console.error("Error deleting bid:", error);
    }
  }

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Please wait....
      </p>
    );

  if (bids.length === 0)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-4xl">
        No Projects found
      </p>
    );

  const filtered = bids.filter((b) => b.bidStatus === activeTab);

  return (
    <>
      <div className="flex justify-center min-h-screen bg-linear-to-br from-blue-100 to-indigo-100">
        <div className="flex flex-col mt-2 mb-15 py-10 rounded-xl ">
          <div className="flex justify-between">
            <div className="flex gap-6">
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "pending"
                    ? "bg-linear-to-r from-gray-600 to-gray-500 text-white"
                    : "text-black"
                } `}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "inprogress"
                    ? "bg-linear-to-r from-blue-600 to-blue-500 text-white"
                    : "text-black"
                } `}
                onClick={() => setActiveTab("inprogress")}
              >
                In Progress
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "completed"
                    ? "bg-linear-to-r from-green-700 to-green-600 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "closed"
                    ? "bg-linear-to-r from-red-600 to-red-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveTab("closed")}
              >
                Closed
              </button>
              <button
                className={`font-semibold rounded text-md py-2 px-4 cursor-pointer ${
                  activeTab === "incomplete"
                    ? "bg-linear-to-r from-purple-600 to-purple-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActiveTab("incomplete")}
              >
                incomplete
              </button>
            </div>
            <div>
              <p className="font-bold mr-1 mt-2 text-2xl">
                Total - {filtered.length}
              </p>
            </div>
          </div>
          {filtered.length === 0 && (
            <p className="flex mt-65 justify-center font-bold text-gray-700 text-4xl">
              No bids found
            </p>
          )}
          <div>
            <div>
              <table className=" my-6 w-[1155px] border-separate border-spacing-y-4 ">
                <thead className="bg-indigo-600 h-14 font-normal text-white shadow-lg ">
                  <tr className="text-center rounded-lg ">
                    <th className="rounded-l-lg">Project Title</th>
                    <th>Budget</th>
                    <th className="px-4">
                      {["inprogress", "completed"].includes(activeTab) ? (
                        <p>Client</p>
                      ) : activeTab === "pending" ? (
                        <p>Status</p>
                      ) : null}
                    </th>
                    <th>My Bid</th>

                    <th>Delivery</th>

                    <th
                      className={`${
                        activeTab !== "pending" && activeTab !== "completed"
                          ? "rounded-r-lg"
                          : ""
                      }`}
                    >
                      Posted On
                    </th>
                    <th className="rounded-r-lg ">
                      {["completed", "pending"].includes(activeTab) && (
                        <p>Actions</p>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(
                    (b) =>
                      b.project && (
                        <tr
                          key={`${b.project._id}-${b.bidId}`}
                          className="bg-gray-50 rounded-lg shadow-md text-center"
                        >
                          <td
                            className="w-60 rounded-l-lg"
                            onClick={
                              b.bidStatus === "pending"
                                ? () =>
                                    navigate(`/freelancer/bid/${b.project._id}`)
                                : null
                            }
                          >
                            <span
                              className={`overflow-hidden px-4 line-clamp-2 ${
                                b.bidStatus === "pending" &&
                                "hover:text-blue-500 hover:underline cursor-pointer"
                              }  ${
                                ["incomplete", "closed"].includes(
                                  b.bidStatus
                                ) && "my-2"
                              }  `}
                            >
                              {b.project.projectTitle}
                            </span>
                          </td>
                          <td className="font-bold">$ {b.project.budget}</td>
                          <td className="py-2 px-4 text-center">
                            {["inprogress", "completed"].includes(
                              b.bidStatus
                            ) ? (
                              <p>
                                <span className="flex flex-row gap-2  justify-center items-center">
                                  <img
                                    src={b.clientImage || "/default-avatar.png"}
                                    className="h-8 w-8 rounded"
                                  />
                                  <span
                                    onClick={() => {
                                      navigate(
                                        `/freelancer/get/client/details/${b.clientId}`
                                      );
                                    }}
                                    className="hover:text-blue-600 hover:underline cursor-pointer"
                                  >
                                    {b.clientName || ""}
                                  </span>
                                </span>
                              </p>
                            ) : b.bidStatus === "pending" ? (
                              <span>{b.bidStatus}</span>
                            ) : null}
                          </td>

                          <td className="font-bold">$ {b.bidAmount}</td>
                          <td>
                            {new Date(b.projectDelivery).toLocaleDateString()}
                          </td>
                          <td
                            className={`${
                              b.bidStatus !== "pending" &&
                              b.bidStatus !== "completed"
                                ? "rounded-r-lg"
                                : ""
                            }`}
                          >
                            {new Date(b.project.createdAt).toLocaleDateString()}
                          </td>

                          <td className="rounded-r-lg">
                            {b.bidStatus === "pending" && (
                              <button
                                className="bg-red-500 font-semibold hover:bg-red-600 cursor-pointer text-white py-1 px-4 my-2 ml-1 rounded"
                                onClick={() => handleDelete(b.bidId)}
                              >
                                Withdraw
                              </button>
                            )}

                            {b.bidStatus === "completed" &&
                              (b.hasReviewed ||
                              reviewedProjects[b.project._id] ? (
                                <span className="text-gray-800 font-semibold">
                                  Reviewed{" "}
                                  <span className="bg-green-600 text-white px-1.5 py-0.5 rounded-full text-sm">
                                    ✓
                                  </span>
                                </span>
                              ) : (
                                <button
                                  className="px-2 text-sm py-2 my-2 bg-linear-to-r from-fuchsia-700 to-fuchsia-600 hover:bg-linear-to-r hover:from-fuchsia-600 hover:to-fuchsia-500 rounded font-semibold cursor-pointer text-white"
                                  onClick={() => {
                                    setSelectedProject(b.project._id);
                                    setSelectedClient(b.project.createdBy?._id);
                                    setOpenModal(true);
                                  }}
                                >
                                  Leave a review
                                </button>
                              ))}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
              {openModal && (
                <PostFreelancerReview
                  projectId={selectedProject}
                  clientId={selectedClient}
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
      </div>
      <Footer />
    </>
  );
}

export default GetAllBids;
