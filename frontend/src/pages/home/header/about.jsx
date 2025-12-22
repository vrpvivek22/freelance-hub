import { Link } from "react-router-dom";
import { FaLaptopCode, FaUsers, FaGlobe, FaLaptop } from "react-icons/fa";
import Footer from "../footer";
import { useState } from "react";

function Aboutus() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className=" absolute top-0 left-0 flex items-center px-25 w-full h-20 bg-white backdrop-blur-sm z-20 shadow-md">
        <FaLaptop className="text-5xl mt-1 text-amber-500" />
        <h1 className=" text-black text-3xl ml-2 mr-5 logo-text">
          FreelanceHub
        </h1>
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setOpenMenu(true)}
          onMouseLeave={() => setOpenMenu(false)}
        >
          <p className=" hover:text-blue-600 mx-5 my-10 transition cursor-pointer">
            Categories
          </p>

          {openMenu && (
            <div className="absolute top-25 left-0 w-[800px] border flex flex-auto bg-white shadow-lg p-8 rounded-lg z-50">
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
        <div className=" absolute right-0 px-15">
          <Link
            to="/auth"
            className="text-black cursor-pointer mx-5 hover:text-blue-600 transition"
          >
            Log in
          </Link>

          <Link
            to="/auth"
            className="text-white cursor-pointer px-4 py-2 bg-green-600 rounded mx-5 hover:bg-green-700 hover:border-none"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 h-[0.4px] mt-20"></div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 pt-10">
        <div className="bg-blue-600 max-w-7xl mx-auto  rounded-3xl text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-bold mb-10">About FreelanceHub</h1>
          <div className="max-w-6xl m-auto">
            <p className="text-lg text-white leading-relaxed mb-4">
              FreelanceHub is your ultimate platform for connecting talented
              freelancers with clients looking for quality work. Whether you’re
              a designer, developer, writer, or digital marketer, we make it
              easy to showcase your skills and find projects that match your
              expertise.
            </p>
            <p className="text-lg text-white leading-relaxed mb-4">
              Our mission is to empower freelancers to grow their careers while
              helping businesses access skilled professionals on demand. We
              believe in creating a community built on trust, transparency, and
              mutual success.
            </p>
            <p className="text-lg text-white leading-relaxed mb-15">
              At FreelanceHub, every project matters. Our platform is designed
              to make collaboration seamless, payments secure, and communication
              effortless. Join thousands of freelancers and clients who trust us
              to bring their ideas to life.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/auth"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow cursor-pointer hover:text-white hover:bg-green-500 mr-4"
            >
              Find Jobs
            </Link>
            <Link
              to="/auth"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow cursor-pointer hover:text-white hover:bg-green-500 transition-2s"
            >
              Post a Project
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-white p-6 rounded-lg hover:shadow-xl shadow-sm transition">
            <FaLaptopCode className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Quality Projects</h3>
            <p className="text-gray-700">
              Find projects that match your skills and get paid fairly for your
              work.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg hover:shadow-xl shadow-sm transition">
            <FaUsers className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Trusted Community</h3>
            <p className="text-gray-700">
              Join a growing network of freelancers and clients built on trust
              and collaboration.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg hover:shadow-xl shadow-sm transition">
            <FaGlobe className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Global Opportunities</h3>
            <p className="text-gray-700">
              Work on projects from around the world and expand your
              professional network.
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
