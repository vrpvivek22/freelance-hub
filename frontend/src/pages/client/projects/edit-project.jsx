import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleClientProjectApi,
  updateProjectApi,
} from "@/services/client/project";
import { useRefresh } from "@/context/Refresh-context";
import SkillInput from "@/utils/skills-section";

function EditCLientProject() {
  const { projectId } = useParams();
  const [projectTitle, setprojectTitle] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});
  const { refreshFlag } = useRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setprojectTitle(project.projectTitle || "");
      setProjectDetails(project.projectDetails || "");
      setSkills(project.skills || "");
      setBudget(project.budget || " ");
      setDeadline(project.deadline?.split("T")[0] || "");
    }
  }, [project]);

  useEffect(() => {
    async function load() {
      const res = await getSingleClientProjectApi(projectId);
      setProject(res.project);
    }
    load();
  }, [projectId, refreshFlag]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setErrors({});
      const body = {
        projectTitle,
        projectDetails,
        skills,
        budget,
        deadline,
      };
      const res = await updateProjectApi(projectId, body);
      alert(res.message);
      setProject((prev) => ({ ...prev, ...body }));
      navigate("/client/projects");
    } catch (error) {
      if (error.response?.data?.errors) {
        const fieldErrors = {};

        error.response.data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors("Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-10">
      <form
        onSubmit={handleUpdate}
        className="  max-w-4xl mx-auto px-10 p-10 space-y-6 rounded-2xl shadow-xl bg-white "
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col relative">
            <label className="font-semibold my-1">Project Title</label>
            <input
              className="border-[0.2px] border-gray-400 px-4 py-2 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition-all"
              value={projectTitle}
              type="text"
              onChange={(e) => setprojectTitle(e.target.value)}
              placeholder="Project Title"
            />
            {errors.projectTitle && (
              <p className="text-sm absolute top-20 right-2 text-red-600">
                ⚠{errors.projectTitle}
              </p>
            )}
          </div>
          <div className="flex flex-col relative">
            <label className="font-semibold my-1">Project Description</label>
            <textarea
              className="border-[0.2px] border-gray-400 px-3 py-2 h-96 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition-all"
              type="text"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="Enter your Project description"
            />
            {errors.projectDetails && (
              <p className="text-sm absolute -bottom-6 right-2 text-red-600">
                ⚠{errors.projectDetails}
              </p>
            )}
          </div>
          <div className="flex flex-row justify-between ">
            <div className="flex flex-col relative">
              <SkillInput skills={skills} setSkills={setSkills} />
              {errors.skills && (
                <p className="text-sm absolute top-19 right-1 text-red-600">
                  ⚠{errors.skills}
                </p>
              )}
            </div>
            <div className="flex flex-col relative">
              <div className="flex flex-row gap-2">
                <label className="font-semibold my-1">Budget</label>
                <p className="text-sm text-gray-600 font-semibold my-1.5">
                  (in dollars)
                </p>
              </div>
              <input
                className="border-[0.2px] border-gray-400 px-4 py-1.5 w-80 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition-all"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Budget"
              />
              {errors.budget && (
                <p className="text-sm absolute top-19 left-1 text-red-600">
                  ⚠{errors.budget}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col relative">
              <label className="font-semibold my-1">Deadline</label>
              <input
                type="date"
                className="border-[0.2px] border-gray-400 px-4 py-1.5 w-60 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition-all"
                min={new Date().toISOString().split("T")[0]}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="deadline"
              />
              {errors.deadline && (
                <p className="text-sm absolute top-19 left-1 text-red-600">
                  ⚠{errors.deadline}
                </p>
              )}
            </div>
            <div className="flex flex-row mt-8 space-x-8">
              <button
                className="font-semibold bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-6 py-2 rounded"
                type="submit"
              >
                save
              </button>
              <button
                type="button"
                className="font-semibold bg-red-500 hover:bg-red-600 cursor-pointer text-white px-6 py-2 rounded"
                onClick={() => navigate("/client/projects")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCLientProject;
