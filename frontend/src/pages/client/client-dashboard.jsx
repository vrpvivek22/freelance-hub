import { useAuth } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaFolderOpen,
  FaLaptop,
  FaUserCircle,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Footer from "../home/footer";
import { getClientDetailsApi } from "@/services/client/client-details";
import { FiLogOut, FiSettings } from "react-icons/fi";
import getClientProfileSearch from "@/services/client/get-profiles";
import { getClientProjectApi } from "@/services/client/project";

function ClientDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadUserName() {
      const res = await getClientDetailsApi();
      const details = res.details;
      setUserName(details.name);
      setUserImage(details.profileImage);
    }

    loadUserName();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await getClientProfileSearch();
        setProfiles(res.profiles);
      } catch (err) {
        console.log("failed to fetch profiles", err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const res = await getClientProjectApi();
      setProjects(res.projects);
    }
    load();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/client/profiles?query=${encodeURIComponent(search.trim())}`);
  };

  const isNewUser = localStorage.getItem("newUser");
  const pending = projects.filter((p) => p.status === "pending");
  const inprogress = projects.filter((p) => p.status === "inprogress");
  const completed = projects.filter((p) => p.status === "completed");
  const incomplete = projects.filter((p) => p.status === "incomplete");

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex flex-col flex-auto ">
        <div className="flex flex-auto flex-col max-w-full">
          <div className="flex flex-auto flex-row items-center justify-center space-x-9 bg-gradient-to-b from-blue-600 to-indigo-700 h-24 shadow-xl">
            <div className="flex flex-row items-center">
              <FaLaptop className="text-4xl mt-0.5 text-amber-500" />
              <p className=" text-white ml-2 text-2xl logo-text ">
                Freelance Hub
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className=" flex flex-row h-10 w-161 relative ">
                <input
                  className=" bg-white h-10 w-135 rounded-l-full pl-4 pr-2 pb-1 placeholder:text-gray-500 focus:outline-none"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Talents"
                />
                <button className="bg-gradient-to-br from-amber-500 to-orange-500 flex flex-row items-center justify-center pr-1  hover:from-amber-600 hover:to-red-500 w-25 h-10 cursor-pointer font-semibold text-white rounded-r-full ">
                  <BsSearch className="mr-1 text-sm mt-0.5" />
                  Search
                </button>
              </div>
            </form>

            <div>
              <button
                className=" py-2 px-4 bg-gradient-to-br from-lime-500 to-green-500  hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded cursor-pointer"
                onClick={() => {
                  navigate("/client/dashboard/post");
                }}
              >
                Post a Project
              </button>
            </div>
            <div>
              <div className="flex">
                <button>
                  <img
                    src={userImage ? userImage : "/default-avatar.png"}
                    className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-70"
                    onClick={() => setOpen(true)}
                  />
                </button>
              </div>
              <div
                className={`
          fixed top-0 right-0 h-full w-72  bg-gradient-to-br from-gray-200 via-blue-200 to-indigo-200 text-black px-5 py-16
          transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "translate-x-full"}
         `}
              >
                {" "}
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
                      navigate("/client/get/details");
                      setOpen(false);
                    }}
                  >
                    <FaUserCircle className="text-xl mr-2" />
                    Profile
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/client/profiles");
                      setOpen(false);
                    }}
                  >
                    <FaUserFriends className="text-xl mr-2" />
                    Find Talent
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/client/projects");
                      setOpen(false);
                    }}
                  >
                    <FaFolderOpen className="text-xl mr-2" />
                    My Projects
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/client/invitations");
                      setOpen(false);
                    }}
                  >
                    <FaUserPlus className="text-xl mr-2" />
                    Invites
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/client/settings");
                      setOpen(false);
                    }}
                  >
                    <FiSettings className="text-xl mr-2" />
                    Settings
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="text-xl mr-2" />
                    Logout
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
        <div className="min-h-screen flex flex-col pl-46 pt-2 pb-30 bg-gradient-to-br gap-10 from-blue-200 to-indigo-100">
          <div className="shadow-[0_2px_20px_rgba(0,0,0,0.1)] bg-gradient-to-r from-blue-100 to-gray-50 max-w-6xl flex flex-col mt-6 rounded-xl">
            <div className="text-5xl font-semibold p-12">
              <p className="animate-fadeSlow">
                {isNewUser === "true"
                  ? `Welcome ${userName}`
                  : `Welcome back ${userName}`}
              </p>
            </div>

            <div className="rounded-lg px-10 pb-10 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gray-200 border-2 text-center border-gray-400 p-4 rounded-lg shadow">
                  <h2 className="font-semibold text-gray-600 text-lg">
                    Pending Projects
                  </h2>
                  <p className="text-gray-700 text-2xl font-bold mt-2">
                    {pending.length}
                  </p>
                </div>
                <div className="bg-blue-100 border-2 text-center border-blue-500 p-4 rounded-lg shadow">
                  <h2 className="font-semibold text-blue-700 text-lg">
                    In Progress
                  </h2>
                  <p className="text-gray-700 text-2xl font-bold mt-2">
                    {inprogress.length}
                  </p>
                </div>
                <div className="bg-green-100 border-2 text-center border-green-600 p-4 rounded-lg shadow">
                  <h2 className="font-semibold text-green-800 text-lg">
                    Completed Projects
                  </h2>
                  <p className="text-gray-700 text-2xl font-bold mt-2">
                    {completed.length}
                  </p>
                </div>
                <div className="bg-red-100 border-2 text-center border-red-500 p-4 rounded-lg shadow">
                  <h2 className="font-semibold text-red-700 text-lg">
                    Incomplete Projects
                  </h2>
                  <p className="text-gray-700 text-2xl font-bold mt-2">
                    {incomplete.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col max-w-6xl">
            <div className="my-3 flex flex-col">
              <h2 className="text-4xl font-bold mb-3 ml-1">
                Top Talent for you
              </h2>
              <p className="mb-8 text-md font-semibold ml-2 text-gray-600">
                Find the perfect talent for your next project.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {profiles.slice(0, 8).map((p, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-100 to-gray-50 hover:scale-[1.03] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded-lg p-8 flex flex-col items-center text-center"
                  >
                    <img
                      src={
                        p.profileImage ? p.profileImage : "/default-avatar.png"
                      }
                      alt="Profile"
                      className="w-24 h-24 mb-2 object-cover rounded-full"
                    />
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.title}</p>
                    <div className="text-black flex flex-row items-center mb-1">
                      <p className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-2xl ${
                              i < Math.floor(p.averageRating)
                                ? "text-pink-700"
                                : "text-gray-400"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className=" ml-2 mt-1.5 text-sm">
                          {p.averageRating
                            ? Number(p.averageRating).toFixed(1)
                            : "0.0"}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/client/freelancer/profile/${p.createdBy}`)
                      }
                      className="mt-2 bg-blue-600 font-semibold cursor-pointer text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="bg-blue-500 text-white ml-130 px-4 py-2 max-w-28 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 text-lg text-center font-semibold mt-12 cursor-pointer"
                onClick={() => navigate("/client/profiles")}
              >
                more
                <FaArrowRight className="text-sm mt-1" />
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ClientDashboard;
