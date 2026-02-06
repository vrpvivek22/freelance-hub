import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/freelanceHub-2.png";
import Header from "./header/main";
import Footer from "./footer";
import {
  FaArrowRight,
  FaGlobe,
  FaLaptopCode,
  FaPlayCircle,
  FaSearchDollar,
  FaUsers,
} from "react-icons/fa";
import { AiOutlineDashboard, AiOutlineFileAdd } from "react-icons/ai";
import { MdConnectWithoutContact } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();

  function handleAuth() {
    navigate("/auth");
  }

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const maxOpacity = 2;
  const overlayOpacity = Math.min(maxOpacity, scrollY / 600);

  return (
    <>
      <div className="relative items-center text-white duration-300">
        <Header />

        <div
          className="absolute inset-0 bg-cover h-[735px] sm:h-[680px] md:h-[700px] lg:h-[735px] bg-center bg-fixed"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        ></div>

        <div className="absolute inset-0 top-0 h-[735px] sm:h-[680px] md:h-[700px] lg:h-[735px] bg-black opacity-40"></div>

        <div
          className="absolute inset-0 top-0 h-[735px] sm:h-[680px] md:h-[700px] lg:h-[735px] bg-slate-900"
          style={{ opacity: overlayOpacity }}
        ></div>

        <div className="relative z-10 flex flex-col py-30 max-w-4xl px-6 sm:px-10 md:px-20 lg:px-28">
          <div className="flex flex-col">
            <p className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl ml-0 sm:ml-4 md:ml-8">
              Work smarter. Hire better. <br />
              Build faster.
            </p>

            <div className="my-9 space-y-2 mx-0 sm:mx-2 md:mx-4">
              <p className="flex items-center text-white text-lg sm:text-xl ml-0 sm:ml-4 md:ml-8">
                <span className="text-3xl mx-2">•</span> Post a project and get
                offers within minutes.
              </p>
              <p className="flex items-center text-white text-lg sm:text-xl ml-0 sm:ml-4 md:ml-8">
                <span className="text-3xl mx-2">•</span> Trusted professionals
                ready to help.
              </p>
              <p className="flex items-center text-white text-lg sm:text-xl ml-0 sm:ml-4 md:ml-8">
                <span className="text-3xl mx-2">•</span> Start building your
                next big thing.
              </p>
            </div>
          </div>

          <div className="mx-0 sm:mx-6 md:mx-14">
            <button
              className="flex items-center hover:shadow-2xl gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-[0_10px_30px_rgba(219,234,254,0.3)] text-white py-3 rounded-full px-10 sm:px-12 md:px-15 font-bold text-lg sm:text-xl cursor-pointer"
              onClick={handleAuth}
            >
              Start your journey
              <span className="font-light mt-1">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        <section class="pt-20 sm:pt-30 md:pt-45 pb-20 px-6 sm:px-12 md:px-35 flex flex-col items-center bg-gradient-to-b from-slate-900 to-slate-950 text-gray-300 text-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-white">
            About{" "}
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 logo-text tracking-wide">
              FreelanceHub
            </span>
          </h2>
          <p class="text-base sm:text-lg leading-loose max-w-4xl">
            FreelanceHub is a modern online platform built to connect clients
            with talented freelancers in a fast, secure, and flexible way.
            Whether you are looking to hire professionals or showcase your
            skills, FreelanceHub makes collaboration smooth and efficient.
          </p>
        </section>

        <div className="flex flex-col gap-18 bg-gradient-to-r from-slate-900 to-slate-950 py-24 px-6 sm:px-12 md:px-35">
          <div>
            <p className="font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8">
              How it works?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-18">
            <div>
              <h3 className="text-2xl sm:text-3xl ml-0 sm:ml-4 font-bold text-blue-500 mb-6">
                Clients
              </h3>

              <div className="space-y-10">
                <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500 transition">
                  <h4 className="text-xl font-semibold mb-3 text-white">
                    <AiOutlineFileAdd className="text-4xl mb-4 text-orange-500" />
                    Post a Project
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Share your project requirements, budget, and timeline. Your
                    project becomes visible to skilled freelancers instantly.
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500 transition">
                  <h4 className="text-xl font-semibold mb-3 text-white">
                    <MdConnectWithoutContact className="text-4xl mb-4 text-green-500" />
                    Connect with Talent
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Receive bids, explore freelancer profiles, or invite
                    professionals directly based on your needs.
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500 transition">
                  <h4 className="text-xl font-semibold mb-3 text-white">
                    <FaPlayCircle className="text-4xl mb-4 text-purple-500" />
                    Start Working
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Accept a bid and automatically move the project to “In
                    Progress” for smooth collaboration.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl ml-0 sm:ml-4 font-bold text-indigo-500 mb-6">
                Freelancers
              </h3>

              <div className="space-y-10">
                <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500 transition">
                  <h4 className="text-xl font-semibold mb-3 text-white">
                    <CgProfile className="text-4xl mb-4 text-yellow-500" />
                    Create Your Profile
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Build a professional profile showcasing your skills,
                    experience, and portfolio to attract clients.
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500 transition">
                  <h4 className="text-xl font-semibold mb-3 text-white">
                    <FaSearchDollar className="text-4xl mb-4 text-cyan-500" />
                    Discover & Bid on Projects
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Browse relevant projects, place competitive bids, and
                    receive direct invitations from clients.
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500 transition">
                  <h4 className="text-xl font-semibold mb-3 text-white">
                    <AiOutlineDashboard className="text-4xl mb-4 text-indigo-500" />
                    Manage Your Work
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Track project status, communicate with clients, and deliver
                    work efficiently through a single dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-l from-slate-900 to-slate-950 py-16 sm:py-20 px-4 sm:px-8 lg:px-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-12">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 tracking-wide">
              FreelanceHub?
            </span>
          </h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 hover:scale-[1.04] transition-all duration-300 flex flex-col items-center space-y-4 rounded-xl shadow-md hover:shadow-xl">
              <FaLaptopCode className="text-4xl" />
              <h3 className="text-2xl font-bold text-center">
                Quality Projects
              </h3>
              <p className="text-center text-indigo-100">
                Find projects that match your skills and get paid fairly for
                your work.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 hover:scale-[1.04] transition-all duration-300 flex flex-col items-center space-y-4 rounded-xl shadow-md hover:shadow-xl">
              <FaUsers className="text-4xl" />
              <h3 className="text-2xl font-bold text-center">
                Trusted Community
              </h3>
              <p className="text-center text-indigo-100">
                Join a growing network of freelancers and clients built on trust
                and collaboration.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 hover:scale-[1.04] transition-all duration-300 flex flex-col items-center space-y-4 rounded-xl shadow-md hover:shadow-xl">
              <FaGlobe className="text-4xl" />
              <h3 className="text-2xl font-bold text-center">
                Global Opportunities
              </h3>
              <p className="text-center text-indigo-100">
                Work on projects from around the world and expand your
                professional network.
              </p>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-[10%] text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start Your Journey with FreelanceHub
          </h2>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 text-indigo-100">
            Join a growing community of clients and freelancers and turn your
            ideas into reality.
          </p>

          <a
            href="/auth"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 font-bold rounded-full shadow-md hover:shadow-[0_10px_30px_rgba(219,234,254,0.3)] transition-all"
          >
            Get Started
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
