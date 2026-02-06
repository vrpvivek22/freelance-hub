import { useState } from "react";
import { FaLaptop, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="top-0 sticky flex justify-between items-center px-6 sm:px-10 md:px-20 lg:px-35 w-full h-20 md:h-22 bg-black/40 backdrop-blur-sm z-20">
      <div className="flex flex-row items-center">
        <FaLaptop className="text-4xl md:text-5xl mt-1 text-amber-500" />
        <h1 className="text-white text-2xl md:text-3xl ml-2 mr-5 logo-text">
          FreelanceHub
        </h1>
        <div
          className="relative cursor-pointer hidden md:block"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className="hover:text-blue-500 mx-5 my-10 transition cursor-pointer">
            Categories
          </p>

          {openMenu && (
            <div className="absolute top-20 left-0 w-[800px] bg-white shadow-lg p-8 rounded-lg z-50">
              <div className="grid grid-cols-4 gap-15">
                <div>
                  <h3 className="font-semibold mb-2 text-black">
                    Design & Creative
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="hover:text-blue-500">Logo Design</li>
                    <li className="hover:text-blue-500">Graphic Design</li>
                    <li className="hover:text-blue-500">Web Design</li>
                    <li className="hover:text-blue-500">Illustration</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-black">Development</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="hover:text-blue-500">Web Development</li>
                    <li className="hover:text-blue-500">Mobile Apps</li>
                    <li className="hover:text-blue-500">Python</li>
                    <li className="hover:text-blue-500">AI Jobs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-black">Writing</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="hover:text-blue-500">Copywriting</li>
                    <li className="hover:text-blue-500">Ghostwriting</li>
                    <li className="hover:text-blue-500">Blog Writing</li>
                    <li className="hover:text-blue-500">Editing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-black">Marketing</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li className="hover:text-blue-500">SEO</li>
                    <li className="hover:text-blue-500">Google Ads</li>
                    <li className="hover:text-blue-500">Email Marketing</li>
                    <li className="hover:text-blue-500">Social Media</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/api/v1/freelancehub/about"
          className="hidden md:block mx-5 hover:text-blue-400 transition cursor-pointer"
        >
          About us
        </Link>
      </div>

      <div className="hidden md:flex flex-row items-center">
        <Link
          to="/auth"
          state={{ isLoginView: true }}
          className="text-white cursor-pointer mx-5 hover:text-blue-400 transition"
        >
          Log in
        </Link>

        <Link
          to="/auth"
          state={{ isLoginView: false }}
          className="text-white cursor-pointer px-4 py-2 bg-blue-600 rounded ml-5 hover:bg-blue-800"
        >
          Sign Up
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? (
            <FaTimes className="text-white text-2xl" />
          ) : (
            <FaBars className="text-white text-2xl" />
          )}
        </button>
      </div>

      {mobileMenu && (
        <div className="absolute top-20 left-0 w-full bg-slate-900 text-white flex flex-col items-center space-y-6 py-8 md:hidden">
          <Link to="/api/v1/freelancehub/about">About us</Link>
          <Link to="/auth" state={{ isLoginView: true }}>
            Log in
          </Link>
          <Link to="/auth" state={{ isLoginView: false }}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
