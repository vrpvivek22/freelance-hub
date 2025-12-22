import { useState } from "react";
import { FaLaptop } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className=" absolute top-0 left-0 flex items-center px-15 w-full h-20 bg-black/40 backdrop-blur-xs z-20">
      <FaLaptop className="text-5xl mt-1 text-amber-500" />
      <h1 className=" text-white text-3xl ml-2 mr-5 logo-text">FreelanceHub</h1>
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setOpenMenu(true)}
        onMouseLeave={() => setOpenMenu(false)}
      >
        <p className=" hover:text-blue-500 mx-5 my-10 transition cursor-pointer">
          Categories
        </p>

        {openMenu && (
          <div className="absolute top-20 left-0 w-[800px] flex flex-auto bg-white shadow-lg p-8 rounded-lg z-50">
            <div className="grid grid-cols-4 gap-15">
              <div>
                <h3 className="font-semibold mb-2 text-black">
                  Design & Creative
                </h3>
                <ul className="space-y-1 text-gray-600 ">
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
        className=" mx-5 hover:text-blue-400 transition cursor-pointer"
      >
        About us
      </Link>
      <div className=" absolute right-0 px-15">
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
          className="text-white cursor-pointer px-4 py-2 bg-blue-600 rounded mx-5 hover:bg-blue-800 hover:border-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Header;
