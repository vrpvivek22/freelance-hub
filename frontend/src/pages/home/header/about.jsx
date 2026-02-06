import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaUsers,
  FaGlobe,
  FaLaptop,
  FaBars,
} from "react-icons/fa";
import Footer from "../footer";
import { useState } from "react";

function Aboutus() {
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-20 bg-white backdrop-blur-sm z-30 shadow-md flex items-center px-6 lg:px-12">
        <FaLaptop className="text-4xl text-amber-500" />
        <h1 className="text-black text-2xl ml-2 font-bold logo-text">
          FreelanceHub
        </h1>

        <div
          className="hidden lg:block relative ml-10"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className="hover:text-blue-600 cursor-pointer transition">
            Categories
          </p>

          {openMenu && (
            <div className="absolute top-10 left-0 w-[800px] bg-white shadow-lg p-8 rounded-lg z-50">
              <div className="grid grid-cols-4 gap-8">
                {[
                  {
                    title: "Design & Creative",
                    items: [
                      "Logo Design",
                      "Graphic Design",
                      "Web Design",
                      "Illustration",
                    ],
                  },
                  {
                    title: "Development",
                    items: [
                      "Web Development",
                      "Mobile Apps",
                      "Python",
                      "AI Jobs",
                    ],
                  },
                  {
                    title: "Writing",
                    items: [
                      "Copywriting",
                      "Ghostwriting",
                      "Blog Writing",
                      "Editing",
                    ],
                  },
                  {
                    title: "Marketing",
                    items: [
                      "SEO",
                      "Google Ads",
                      "Email Marketing",
                      "Social Media",
                    ],
                  },
                ].map((section) => (
                  <div key={section.title}>
                    <h3 className="font-semibold mb-2 text-black">
                      {section.title}
                    </h3>
                    <ul className="space-y-1 text-gray-600">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="hover:text-blue-500 cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:flex ml-auto items-center space-x-6">
          <Link to="/auth" className="hover:text-blue-600 transition">
            Log in
          </Link>
          <Link
            to="/auth"
            className="text-white px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="lg:hidden ml-auto text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <FaBars />
        </button>
      </div>

      {mobileMenu && (
        <div className="fixed top-20 left-0 w-full bg-white shadow-lg z-20 p-6 space-y-4 lg:hidden">
          <Link to="/auth" className="block hover:text-blue-600">
            Log in
          </Link>
          <Link to="/auth" className="block hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      )}

      <div className="mt-20" />

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
        <div className="bg-blue-600 max-w-7xl mx-auto rounded-3xl text-white py-16 px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8">
            About FreelanceHub
          </h1>

          <div className="max-w-5xl mx-auto space-y-4 text-lg">
            <p>
              FreelanceHub is your ultimate platform for connecting talented
              freelancers with clients looking for quality work.
            </p>
            <p>
              Our mission is to empower freelancers while helping businesses
              access skilled professionals on demand.
            </p>
            <p>
              At FreelanceHub, every project matters. Collaboration is seamless,
              payments are secure, and communication is effortless.
            </p>
          </div>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to="/auth"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-green-500 hover:text-white"
            >
              Find Jobs
            </Link>
            <Link
              to="/auth"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-green-500 hover:text-white"
            >
              Post a Project
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition">
            <FaLaptopCode className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Quality Projects</h3>
            <p className="text-gray-700">
              Find projects that match your skills and get paid fairly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition">
            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Trusted Community</h3>
            <p className="text-gray-700">
              A growing network built on trust and collaboration.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition">
            <FaGlobe className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Global Opportunities</h3>
            <p className="text-gray-700">
              Work with clients from around the world.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 px-6 text-center">
        <p className="text-xl font-semibold text-gray-800 max-w-2xl mx-auto">
          FreelanceHub – Connecting Talent, Creating Opportunities.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Aboutus;
