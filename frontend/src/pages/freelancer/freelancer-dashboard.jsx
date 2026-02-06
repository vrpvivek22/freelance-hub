import { useAuth } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaFolderOpen,
  FaLaptop,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Footer from "../home/footer";
import { FiLogOut, FiSearch, FiSettings } from "react-icons/fi";
import { getFreelancerProfileApi } from "@/services/freelancer/freelancer-profile";
import getFreelancerProjectSearch from "@/services/freelancer/get-projects";
import { getAllbidsApi } from "@/services/freelancer/bids";

function FreelancerDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    async function loadUserName() {
      const res = await getFreelancerProfileApi();
      const profile = res.profile;
      setUserName(profile.name);
      setUserImage(profile.profileImage);
    }

    loadUserName();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await getAllbidsApi();
        setBids(res.bids);
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await getFreelancerProjectSearch();
        setProjects(res.projects || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    load();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/freelancer/projects?query=${encodeURIComponent(search.trim())}`);
  };

  const isNewUser = localStorage.getItem("newUser");
  const pending = bids.filter((b) => b.bidStatus === "pending");
  const inprogress = bids.filter((b) => b.bidStatus === "inprogress");
  const completed = bids.filter((b) => b.bidStatus === "completed");
  const closed = bids.filter((b) => b.bidStatus === "closed");
  const incomplete = bids.filter((b) => b.bidStatus === "incomplete");

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex flex-col flex-auto">
        <div className="flex flex-auto flex-col max-w-full">
          <div className="flex flex-row md:flex-row flex-auto items-center justify-between md:justify-center gap-4 sm:gap-0 md:space-x-9 bg-gradient-to-b from-blue-600 to-indigo-700 h-auto md:h-24 px-4 shadow-xl z-200">
            <div className="flex flex-row items-center">
              <FaLaptop className="text-3xl sm:text-4xl mt-0.5 text-amber-500" />
              <p className="text-white ml-2 my-2 sm:my-5 text-md sm:text-2xl logo-text">
                Freelance Hub
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="flex flex-row h-10 w-full sm:w-203 relative">
                <input
                  className="bg-white h-8 mt-1 sm:mt-0 sm:h-10 w-full md:w-178 rounded-l-full pl-4 pr-2 pb-1 placeholder:text-gray-500 focus:outline-none"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Projects"
                />
                <button className="bg-gradient-to-br from-amber-500 to-orange-500 flex flex-row items-center justify-center pr-1 hover:from-amber-600 hover:to-red-500 w-20 md:w-35 h-8 mt-1 sm:mt-0 sm:h-10 cursor-pointer font-semibold text-white rounded-r-full">
                  <BsSearch className="mr-1 text-sm mt-0.5" />
                  <span className="hidden sm:block">Search</span>
                </button>
              </div>
            </form>

            <div>
              <div className="flex">
                <button>
                  <img
                    src={userImage ? userImage : "/default-avatar.png"}
                    className="w-14 h-8 md:w-14 md:h-14 object-cover rounded-full border-2 cursor-pointer hover:opacity-70"
                    onClick={() => setOpen(true)}
                  />
                </button>
              </div>

              <div
                className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-br from-gray-200 via-blue-200 to-indigo-200 text-black px-5 py-16 transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"}`}
              >
                <div
                  className="bg-red-500 rounded absolute top-3 left-2 pb-3 text-white w-9 h-8 hover:bg-red-400 cursor-pointer flex"
                  onClick={() => setOpen(false)}
                >
                  <button className="text-xl font-semibold mt-0.5 ml-2.5 pb-3 cursor-pointer">
                    ✕
                  </button>
                </div>

                <ul className="space-y-3">
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/get/profile");
                      setOpen(false);
                    }}
                  >
                    <FaUserCircle className="text-xl mr-2" /> Profile
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/projects");
                      setOpen(false);
                    }}
                  >
                    <FiSearch className="text-xl mr-2" /> Find Projects
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/bids");
                      setOpen(false);
                    }}
                  >
                    <FaFolderOpen className="text-xl mr-2" /> My Projects
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/invitations");
                      setOpen(false);
                    }}
                  >
                    <FaUserPlus className="text-xl mr-2" /> Invites
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/settings");
                      setOpen(false);
                    }}
                  >
                    <FiSettings className="text-xl mr-2" /> Settings
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="text-xl mr-2" /> Logout
                  </li>
                </ul>
              </div>

              {open && (
                <div
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-black/50 z-0"
                ></div>
              )}
            </div>
          </div>
        </div>

        <div className="min-h-screen px-4 bg-gradient-to-br from-blue-200 to-indigo-100 flex flex-col">
          <div className="shadow-[0_2px_20px_rgba(0,0,0,0.1)] bg-gradient-to-r from-blue-100 to-gray-50 max-w-6xl flex flex-col mt-6 rounded-2xl mx-auto w-full">
            <div className="text-3xl sm:text-5xl font-semibold pt-8 px-6 sm:px-10 pb-4">
              <p className="animate-fadeSlow">
                {isNewUser === "true"
                  ? `Welcome ${userName}`
                  : `Welcome back ${userName}`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 p-6 sm:p-10 gap-6 max-w-6xl">
              <div className="bg-gray-200 border-2 border-gray-500 rounded-lg p-4 text-center">
                <p className="text-gray-600 font-semibold text-lg">
                  Pending Projects
                </p>
                <p className="text-gray-700 text-2xl font-bold mt-2">
                  {pending.length}
                </p>
              </div>
              <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center">
                <p className="text-blue-700 font-semibold text-lg">
                  In Progress
                </p>
                <p className="text-gray-700 text-2xl font-bold mt-2">
                  {inprogress.length}
                </p>
              </div>
              <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold text-lg">
                  Completed
                </p>
                <p className="text-gray-700 text-2xl font-bold mt-2">
                  {completed.length}
                </p>
              </div>
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-center">
                <p className="text-red-700 font-semibold text-lg">Closed</p>
                <p className="text-gray-700 text-2xl font-bold mt-2">
                  {closed.length}
                </p>
              </div>
              <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 text-center">
                <p className="text-purple-700 font-semibold text-lg">
                  Incomplete
                </p>
                <p className="text-gray-700 text-2xl font-bold mt-2">
                  {incomplete.length}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto w-full">
            <div className="mt-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 ml-3">
                Top Projects for You
              </h2>
              <p className="mb-8 text-md font-semibold ml-4 text-gray-600">
                Hand-picked projects matching your skills
              </p>

              <div className="space-y-4 pb-30 flex items-center flex-col max-w-6xl">
                {projects.slice(0, 3).map((p, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50 rounded-xl p-5 sm:p-8 shadow-sm flex flex-col lg:flex-row hover:scale-[1.01] transition-all justify-between items-start lg:items-center w-full"
                  >
                    <div className="flex flex-col space-y-4">
                      <p className="font-semibold text-xl sm:text-2xl text-indigo-700 w-full lg:w-[850px]">
                        {p.projectTitle}
                      </p>
                      <p className="max-h-14 line-clamp-2 w-full lg:w-[900px] overflow-hidden leading-relaxed text-gray-800 text-[15px] sm:text-[16px]">
                        {p.projectDetails}
                      </p>
                      <p className="flex flex-wrap gap-2">
                        {(p.skills || []).map((skill, i) => (
                          <span
                            key={i}
                            className="flex font-semibold items-center text-indigo-700"
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
                    </div>

                    <div className="space-y-6 mt-4 lg:mt-0">
                      <p className="text-[17px]">
                        Budget - <span className="font-bold">$ {p.budget}</span>
                      </p>
                      <button
                        onClick={() => navigate(`/freelancer/bid/${p._id}`)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:underline text-md text-center font-semibold mt-6 cursor-pointer"
                  onClick={() => navigate("/freelancer/projects")}
                >
                  More <FaArrowRight className="text-sm mt-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default FreelancerDashboard;
