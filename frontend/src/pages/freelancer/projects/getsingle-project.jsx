import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getsingleProjectdetails } from "@/services/freelancer/get-projects";
import placeBidApi from "@/services/freelancer/bids";
import { useRefresh } from "@/context/Refresh-context";
import Footer from "@/pages/home/footer";
import ProjectProposals from "./proposals";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

function FreelancerProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [active, setActive] = useState("details");
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [projectDelivery, setProjectDelivery] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const { refreshFlag } = useRefresh();

  useEffect(() => {
    async function load() {
      try {
        const res = await getsingleProjectdetails(projectId);
        setProject(res.project);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId, refreshFlag]);

  async function handleBid() {
    try {
      await placeBidApi(projectId, { bidAmount, coverLetter, projectDelivery });
      alert("Bid submitted!");
    } catch (err) {
      console.log(err);
      alert("Failed to submit bid");
    }
  }

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Please wait....
      </p>
    );

  if (!project)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        No Project Found
      </p>
    );

  return (
    <>
      <div className="flex flex-row min-h-screen gap-2 justify-center pt-13 items-start bg-gradient-to-br from-gray-100 via-blue-100 to-indigo-100">
        <div className={`${active === "proposals" && "w-[1155px]"}`}>
          <div className=" flex flex-row mb-1">
            <div className=" space-x-4">
              <button
                className={`font-semibold px-6 ml-2 py-2 rounded cursor-pointer ${
                  active === "details"
                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActive("details")}
              >
                Details
              </button>
              <button
                className={`font-semibold px-4 py-2 rounded cursor-pointer ${
                  active === "proposals"
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActive("proposals")}
              >
                Proposals
              </button>
            </div>
          </div>
          {active === "proposals" && <ProjectProposals projectId={projectId} />}
          <div className="flex flex-row justify-between">
            <div className="shadow-[0_0_6px_rgba(0,0,0,0.2)] mt-4 bg-gray-100 mb-5 rounded-2xl w-[900px] flex flex-col">
              {active === "details" && (
                <>
                  <div className="px-12 py-10 space-y-8">
                    <div className="flex flex-row justify-between">
                      <h2 className="text-3xl font-bold">
                        {project.projectTitle}
                      </h2>
                      <div className="flex flex-row space-x-2">
                        <p className="text-2xl font-bold mt-0.5">
                          <span className="ml-8">${project.budget}</span>
                        </p>
                        <span className="text-2xl">|</span>
                        <div className="flex flex-col mt-0.5">
                          <p className="text-[11.5px] font-extrabold">
                            Deadline
                          </p>
                          <p className="text-[10px] font-extrabold">
                            {new Date(project.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start space-y-2">
                      <span className="font-bold text-xl">Description : </span>
                      <p className="px-6 py-3 w-3xl whitespace-pre-line text-gray-700">
                        {project.projectDetails}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-6 mb-4">
                      <span className="font-bold text-xl">
                        Required Skills :{" "}
                      </span>
                      <p className="flex flex-wrap gap-2 mx-6">
                        {project.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="flex border-[0.2px] border-gray-600 rounded-full px-4 pt-0.5 pb-1 text-sm"
                          >
                            {skill}
                            {i !== project.skills.length - 1}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-20">
            {active === "details" &&
              (project.status === "pending" ? (
                <div className="p-4 relative rounded-2xl w-[900px] bg-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  <h3 className="text-3xl font-bold ml-9 my-3">Place a Bid</h3>

                  <div className="flex flex-row px-8 py-4 justify-between">
                    <div className="flex flex-col w-sm">
                      <label className="font-semibold ml-1">Bid Amount</label>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="Enter bid amount in dollars"
                        className="py-2 px-3 mt-1.5 border-[0.2px] rounded bg-white border-gray-400 focus:outline-1 focus:outline-gray-600"
                      />
                    </div>

                    <div className="flex flex-col w-sm">
                      <label className="font-semibold ml-1">
                        I will deliver this project on
                      </label>
                      <input
                        type="date"
                        value={projectDelivery}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setProjectDelivery(e.target.value)}
                        className="py-2 px-3 mt-1.5 border-[0.2px] rounded bg-white border-gray-400 focus:outline-[1px] focus:outline-gray-600"
                      />
                    </div>
                  </div>
                  <div className="px-8">
                    <label className="font-semibold ml-1">
                      Describe your Proposal
                    </label>
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Why I’m the right person to deliver this project successfully"
                      className="py-2 px-3 w-full mt-1.5 mb-15 border-[0.2px] h-50 bg-white rounded-sm border-gray-400 focus:outline-1 focus:outline-gray-600"
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    className="font-semibold bg-gradient-to-r from-blue-700 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 text-white px-6 py-2 absolute bottom-6 right-12.5 rounded cursor-pointer"
                  >
                    Place Bid
                  </button>
                </div>
              ) : (
                <p className="text-green-700 font-semibold px-12 py-8 relative text-xl bg-gray-100 rounded-2xl w-[900px] shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                  A bid has already been accepted. No more actions available.
                </p>
              ))}
          </div>
        </div>
        <div className="sticky top-0.5 mt-15">
          {active === "details" && (
            <div className="shadow-[0_0_6px_0_rgba(0,0,0,0.2)] rounded-2xl  bg-gray-100 px-6 py-8 h-60 w-[235px] space-y-1 flex flex-col">
              <p className="font-semibold text-lg mb-5">About the Client</p>

              <div className="flex flex-row gap-2 ml-0.5 items-center">
                <FiMapPin className=" text-md mt" />
                <p className="text-lg">{project.clientDetails?.country}</p>
              </div>
              <div className="flex flex-row gap-2.5">
                <div>
                  <FaUser className="text-lg mt-3" />
                </div>

                <p className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-3xl ${
                        i < Math.floor(project.clientDetails?.averageRating)
                          ? "text-pink-700"
                          : "text-gray-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className=" ml-2 mt-1.5 text-[19px]">
                    {project.clientDetails?.averageRating
                      ? Number(project.clientDetails?.averageRating).toFixed(1)
                      : "0.0"}
                  </span>
                </p>
              </div>
              <p className="text-gray-700 mt-1.5 ml-1">
                Joined on
                <span className="ml-1 ">
                  {new Date(
                    project.clientDetails?.createdAt
                  ).toLocaleDateString()}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FreelancerProjectDetails;
