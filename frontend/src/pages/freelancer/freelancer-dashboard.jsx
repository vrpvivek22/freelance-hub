import { useAuth } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaFolderOpen,
  FaLaptop,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Footer from "../home/footer";
import { FiLogOut, FiSearch, FiSettings } from "react-icons/fi";
import { getFreelancerProfileApi } from "@/services/freelancer/freelancer-profile";

function FreelancerDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadUserName() {
      const res = await getFreelancerProfileApi();
      const profile = res.profile;
      setUserName(profile.name);
      setUserImage(profile.profileImage);
    }

    loadUserName();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/freelancer/projects?query=${encodeURIComponent(search.trim())}`);
  };

  const isNewUser = localStorage.getItem("newUser");

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <>
      <div className="flex flex-col flex-auto">
        <div className="flex flex-auto flex-col max-w-full">
          <div className="flex flex-auto flex-row items-center justify-center space-x-9 bg-gradient-to-b from-blue-600 to-indigo-700 h-24 shadow-xl">
            <div className="flex flex-row items-center">
              <FaLaptop className="text-4xl mt-0.5 text-amber-500" />
              <p className=" text-white ml-2 my-5 text-2xl logo-text">
                Freelance Hub
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className=" flex flex-row h-10 w-203 relative ">
                <input
                  className=" bg-white h-10 w-178 rounded-l-full pl-4 pr-2 pb-1 placeholder:text-gray-500 focus:outline-none"
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Projects"
                />
                <button className="bg-gradient-to-br from-amber-500 to-orange-500 flex flex-row items-center justify-center pr-1  hover:from-amber-600 hover:to-red-500 w-25 h-10 cursor-pointer font-semibold text-white rounded-r-full ">
                  <BsSearch className="mr-1 text-sm mt-0.5" />
                  Search
                </button>
              </div>
            </form>
            <div>
              <div className="flex">
                <button>
                  <img
                    src={userImage ? userImage : "/default-avatar.png"}
                    className="w-14 h-14 object-cover rounded-full cursor-pointer hover:opacity-70"
                    onClick={() => setOpen(true)}
                  />
                </button>
              </div>

              <div
                className={`
          fixed top-0 right-0 h-full w-72 bg-gradient-to-br from-gray-200 via-blue-200 to-indigo-200 text-black px-5 py-16
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
                      navigate("/freelancer/get/profile");
                      setOpen(false);
                    }}
                  >
                    <FaUserCircle className="text-xl mr-2" />
                    Profile
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/projects");
                      setOpen(false);
                    }}
                  >
                    <FiSearch className="text-xl mr-2" />
                    Find Projects
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/bids");
                      setOpen(false);
                    }}
                  >
                    <FaFolderOpen className="text-xl mr-2" />
                    My Projects
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/invitations");
                      setOpen(false);
                    }}
                  >
                    <FaUserPlus className="text-xl mr-2" />
                    Invites
                  </li>
                  <li
                    className="hover:bg-gray-700 flex flex-row items-center hover:text-white p-4 cursor-pointer rounded-3xl"
                    onClick={() => {
                      navigate("/freelancer/settings");
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
        <div className="min-h-screen bg-gradient-to-br flex flex-col items-center from-gray-100 via-blue-100 to-indigo-100">
          <div className="text-5xl font-semibold shadow w-[1150px] pt-15 pb-18 px-10 rounded-md bg-gradient-to-br from-gray-200 via-blue-200 to-indigo-200">
            <p className="animate-fadeSlow">
              {isNewUser === "true"
                ? `Welcome ${userName}`
                : `Welcome back ${userName}`}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default FreelancerDashboard;
