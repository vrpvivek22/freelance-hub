import { useAuth } from "@/context/authcontext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import {
  FaFolderOpen,
  FaLaptop,
  FaUserCircle,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import { getClientDetailsApi } from "@/services/client/client-details";
import { BsSearch } from "react-icons/bs";
import { FiLogOut, FiSettings } from "react-icons/fi";

function ClientHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [userImage, setUserImage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadUserName() {
      const res = await getClientDetailsApi();
      const details = res.details;
      setUserImage(details.profileImage);
    }

    loadUserName();
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/client/profiles?query=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex flex-col flex-auto">
        <div className="flex flex-auto flex-col max-w-full">
          <div className="flex flex-auto z-100 flex-row items-center justify-center space-x-9 bg-gradient-to-b from-blue-600 to-indigo-700 h-24 shadow-xl">
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
                className="bg-gradient-to-br from-lime-500 to-green-500  hover:from-lime-600 hover:to-green-600 py-2 px-4 text-white font-semibold rounded cursor-pointer"
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
                      navigate("/client/dashboard", { replace: true });
                      setOpen(false);
                    }}
                  >
                    <MdDashboard className="text-xl mr-2" />
                    Dashboard
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
      </div>
    </>
  );
}

export default ClientHeader;
