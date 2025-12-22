import { useNavigate } from "react-router-dom";
import heroBg from "../../assets/freelanceHub-2.png";
import Header from "./header/main";

function Home() {
  const navigate = useNavigate();

  function handleAuth() {
    navigate("/auth");
  }

  return (
    <>
      <div className="relative w-full h-[735px] items-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <Header />
        <div className="relative z-10 flex flex-col py-50 h-full max-w-4xl px-15 ">
          <div className="flex flex-col">
            <p className="text-white font-semibold text-6xl ml-8 ">
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
              className="flex items-center bg-indigo-500 hover:shadow-2xl hover:bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full px-20 font-bold text-xl cursor-pointer"
              onClick={handleAuth}
            >
              Start your journey
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
