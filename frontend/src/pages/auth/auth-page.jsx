import Login from "@/components/login/login";
import SignUp from "@/components/signup/signup";
import { useEffect, useState } from "react";
import { FaLaptop } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function AuthPage() {
  const location = useLocation();
  const [isLoginView, setIsLoginView] = useState(false);

  useEffect(() => {
    if (location.state?.isLoginView !== undefined) {
      setIsLoginView(location.state.isLoginView);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen pt-40 bg-white">
      <div className="flex flex-row h-2/3 mx-70 rounded-2xl shadow-[5px_5px_30px_rgba(1,1,1,0.3)]">
        <div className="flex flex-col w-full h-full items-center">
          <div> {isLoginView ? <Login /> : <SignUp />}</div>
          <p className="mb-6">
            {isLoginView ? (
              <>
                <div className="mb-6">
                  {" "}
                  Don't have an account?{" "}
                  <span
                    onClick={() => setIsLoginView(false)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="mb-2">
                  {" "}
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLoginView(true)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </div>
              </>
            )}
          </p>
        </div>
        <div className=" bg-linear-to-b from-indigo-400 via-purple-200 to-indigo-400 w-full space-y-5 flex flex-col rounded-r-2xl">
          <div className="flex flex-row mx-auto mt-40">
            <FaLaptop className="text-4xl mt-0.5 mr-2 text-amber-500" />
            <p className="logo-text text-3xl text-black ">FreelanceHub</p>
          </div>
          <p className=" text-md font-semibold mx-auto">
            Connecting clients and freelancers worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
