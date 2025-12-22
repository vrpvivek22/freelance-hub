import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteProjectApi,
  getSingleClientProjectApi,
} from "@/services/client/project";
import ProjectProposals from "./proposals";
import { useRefresh } from "@/context/Refresh-context";
import Footer from "@/pages/home/footer";

function ClientProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [active, setActive] = useState("details");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshFlag } = useRefresh();

  useEffect(() => {
    async function load() {
      try {
        const res = await getSingleClientProjectApi(projectId);
        setProject(res.project);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [projectId, refreshFlag]);

  function handleEdit() {
    navigate(`/client/edit/project/${projectId}`);
  }

  async function handleDelete() {
    await deleteProjectApi(projectId);
    alert("project deleted successfully");
    navigate("/client/projects");
  }

  if (loading)
    return (
      <p className="flex mt-65 justify-center font-bold text-gray-700 text-3xl">
        Please wait....
      </p>
    );

  if (!project)
    return (
      <p className="flex mt-65 justify-center font-bold text-red-500 text-3xl">
        No Project Found
      </p>
    );

  return (
    <>
      <div className="flex flex-col min-h-screen items-center bg-gradient-to-br from-gray-100 via-blue-100 to-indigo-100">
        <div className="w-[1150px] ">
          <div className=" flex flex-row justify-between pt-13 mb-1">
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
            <div className="space-x-6 mr-1">
              <button
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-4 py-2 rounded cursor-pointer"
                onClick={() => handleEdit()}
              >
                Edit
              </button>
              <button
                className="text-white font-semibold px-4 py-2 rounded bg-gradient-to-r from-red-600 to-red-500 hover:bg-gradient-to-r hover:from-red-700 hover:to-red-600 cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
          {active === "proposals" && <ProjectProposals projectId={projectId} />}
          <div className="shadow-[0_0_6px_rgba(0,0,0,0.2)] mt-4 mb-20 rounded-2xl bg-gray-100 flex flex-col">
            {active === "details" && (
              <div className="px-15 py-10 space-y-8">
                <div className="flex flex-row justify-between">
                  <h2 className="text-3xl font-bold">{project.projectTitle}</h2>
                  <div className="flex flex-row space-x-2">
                    <p className="text-2xl font-bold mt-0.5">
                      <span className="ml-8">${project.budget}</span>
                    </p>
                    <p className="text-2xl">|</p>
                    <div className="flex flex-col mt-0.5">
                      <p className="text-[11.5px] font-extrabold">Deadline</p>
                      <p className="text-[10px] font-extrabold">
                        {new Date(project.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start space-y-2">
                  <span className="font-bold text-xl">Description : </span>
                  <p className="leading-relaxed px-6 py-3 w-4xl text-[16px] text-gray-700 whitespace-pre-line">
                    {project.projectDetails}
                  </p>
                </div>
                <div className="flex flex-col space-y-6">
                  <span className="font-bold text-xl">Required Skills : </span>
                  <p className="flex flex-wrap gap-2 mt-3 ml-4 mb-10">
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
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ClientProjectDetails;
