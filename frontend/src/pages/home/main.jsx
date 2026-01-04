import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/freelanceHub-2.png";
import Header from "./header/main";
import Footer from "./footer";
import { FaArrowRight, FaGlobe, FaLaptopCode, FaUsers } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  function handleAuth() {
    navigate("/auth");
  }

  return (
    <>
      <div className="relative items-center text-white">
        <div
          className="absolute inset-0 bg-cover h-[735px] bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        ></div>
        <div className="absolute inset-0 top-0 h-[735px] bg-black/50 "></div>

        <Header />
        <div className="relative z-10 flex flex-col py-30 max-w-4xl px-28 ">
          <div className="flex flex-col">
            <p className="text-white font-semibold text-5xl ml-8">
              Work smarter. Hire better. <br />
              Build faster.
            </p>
            <div className="my-9 space-y-2 mx-4">
              <p className="flex items-center text-white text-xl ml-8 ">
                <span className="text-3xl mx-2">•</span> Post a project and get
                offers within minutes.
              </p>
              <p className="flex items-center text-white text-xl ml-8">
                <span className="text-3xl mx-2">•</span> Trusted professionals
                ready to help.
              </p>
              <p className="flex items-center text-white text-xl ml-8">
                <span className="text-3xl mx-2">•</span> Start building your
                next big thing.
              </p>
            </div>
          </div>
          <div className="mx-14">
            <button
              className="flex items-center hover:shadow-2xl gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full px-15 font-bold text-xl cursor-pointer"
              onClick={handleAuth}
            >
              Start your journey
              <span className="font-light mt-1">
                <FaArrowRight />
              </span>
            </button>
          </div>
        </div>

        {/* <section className="py-20 px-[10%] bg-black">
          <h2 className="text-4xl font-bold mb-5 bg-black">
            About FreelanceHub
          </h2>
          <p className="text-lg leading-relaxed max-w-4xl">
            FreelanceHub is a modern online platform built to connect clients
            with talented freelancers in a fast, secure, and flexible way.
            Whether you are looking to hire professionals or showcase your
            skills, FreelanceHub makes collaboration smooth and efficient.
          </p>
        </section> */}

        {/* <section className="py-20 px-[10%] bg-black">
          <h2 className="text-4xl font-bold mb-10">How FreelanceHub Works</h2>

          <div className="flex flex-wrap gap-10">
            <div className="flex-1 min-w-[250px]">
              <h3 className="text-xl font-semibold mb-2">Post a Project</h3>
              <p className="text-base leading-relaxed">
                Share your project requirements, budget, and timeline. Your
                project instantly becomes visible to skilled freelancers.
              </p>
            </div>

            <div className="flex-1 min-w-[250px]">
              <h3 className="text-xl font-semibold mb-2">
                Connect with Talent
              </h3>
              <p className="text-base leading-relaxed">
                Receive bids, explore freelancer profiles, or invite
                professionals directly based on your needs.
              </p>
            </div>

            <div className="flex-1 min-w-[250px]">
              <h3 className="text-xl font-semibold mb-2">Start Working</h3>
              <p className="text-base leading-relaxed">
                Once a bid is accepted, the project status updates automatically
                so you can focus on building instead of managing.
              </p>
            </div>
          </div>
        </section> */}

        <section class="pt-45 px-35 bg-gradient-to-b from-slate-950 to-slate-800 text-gray-300">
          <h2 class="text-4xl font-bold mb-6 text-white">About FreelanceHub</h2>
          <p class="text-lg leading-relaxed">
            FreelanceHub is a modern online platform built to connect clients
            with talented freelancers in a fast, secure, and flexible way.
            Whether you are looking to hire professionals or showcase your
            skills, FreelanceHub makes collaboration smooth and efficient.
          </p>
        </section>

        {/* <section class="py-24 px-[10%] bg-gradient-to-r from-black to-gray-700 text-gray-300">
          <h2 class="text-4xl font-bold mb-14 text-white">
            How FreelanceHub Works
          </h2>

          <div class="flex flex-wrap gap-12">
            <div class="flex-1 min-w-[250px] p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
              <h3 class="text-xl font-semibold mb-3 text-white">
                Post a Project
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Share your project requirements, budget, and timeline. Your
                project instantly becomes visible to skilled freelancers.
              </p>
            </div>

            <div class="flex-1 min-w-[250px] p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
              <h3 class="text-xl font-semibold mb-3 text-white">
                Connect with Talent
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Receive bids, explore freelancer profiles, or invite
                professionals directly based on your needs.
              </p>
            </div>

            <div class="flex-1 min-w-[250px] p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
              <h3 class="text-xl font-semibold mb-3 text-white">
                Start Working
              </h3>
              <p class="text-gray-400 leading-relaxed">
                Once a bid is accepted, the project status updates automatically
                so you can focus on building instead of managing.
              </p>
            </div>
          </div>
        </section> */}

        <div className="flex flex-row md:flex-col gap-18 bg-slate-800 py-20 px-35">
          <div className="">
            <p className="font-bold text-5xl">How it works</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-18">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                For Clients
              </h3>

              <div className="space-y-10">
                <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    Post a Project
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Share your project requirements, budget, and timeline. Your
                    project becomes visible to skilled freelancers instantly.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    Connect with Talent
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Receive bids, explore freelancer profiles, or invite
                    professionals directly based on your needs.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
                  <h4 className="text-xl font-semibold mb-2 text-white">
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
              <h3 className="text-2xl font-bold text-white mb-6">
                For Freelancers
              </h3>

              <div className="space-y-10">
                <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    Create Your Profile
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Build a professional profile showcasing your skills,
                    experience, and portfolio to attract clients.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    Discover & Bid on Projects
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Browse relevant projects, place competitive bids, and
                    receive direct invitations from clients.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500 transition">
                  <h4 className="text-xl font-semibold mb-2 text-white">
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

        {/* <section class="py-24 px-[10%] bg-black text-gray-300">
          <h2 class="text-4xl font-bold mb-12 text-white">
            Why Choose FreelanceHub
          </h2>

          <ul className="text-lg leading-loose max-w-3xl space-y-2 text-gray-400">
            <li>✔ Single account for both client and freelancer roles</li>
            <li>✔ Secure authentication and protected data</li>
            <li>✔ Simple, clean, and user-friendly interface</li>
            <li>✔ Automated project status tracking</li>
            <li>✔ Built for scalability and real-world use</li>
          </ul>
        </section> */}

        <div className="max-w-full mx-auto py-16 bg-gradient-to-r from-slate-950 to-slate-800 px-35 grid md:grid-cols-3 gap-20 text-center">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-lg hover:shadow-xl shadow-md transition">
            <FaLaptopCode className="text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Quality Projects</h3>
            <p>
              Find projects that match your skills and get paid fairly for your
              work.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-lg hover:shadow-xl shadow-sm transition">
            <FaUsers className=" text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Trusted Community</h3>
            <p>
              Join a growing network of freelancers and clients built on trust
              and collaboration.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-lg hover:shadow-xl shadow-sm transition">
            <FaGlobe className="text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Global Opportunities</h3>
            <p>
              Work on projects from around the world and expand your
              professional network.
            </p>
          </div>
        </div>

        <section class="py-24 px-[10%] bg-gradient-to-r from-slate-950 to-slate-800 text-white">
          <h2 class="text-4xl font-bold mb-6">
            Start Your Journey with FreelanceHub
          </h2>
          <p class="text-lg max-w-2xl mb-10 text-indigo-100">
            Join a growing community of clients and freelancers and turn your
            ideas into reality.
          </p>
          <a
            href="/signup"
            class="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-full
           hover:bg-gray-100 transition-all"
          >
            Get Started
          </a>
        </section>
        {/* <div className="py-12 px-6 text-center bg-gradient-to-r from-black to-gray-900">
          <p className="text-xl font-semibold text-white max-w-2xl mx-auto">
            FreelanceHub – Connecting Talent, Creating Opportunities.
          </p>
        </div> */}
      </div>
      <Footer />
    </>
  );
}

export default Home;
