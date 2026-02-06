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
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-[5px_5px_30px_rgba(1,1,1,0.3)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8">
            {isLoginView ? <Login /> : <SignUp />}

            <div className="mt-6 text-md">
              {isLoginView ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => setIsLoginView(false)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLoginView(true)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Login
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex w-1/2 bg-gradient-to-b from-indigo-400 via-purple-200 to-indigo-400 flex-col items-center justify-center space-y-4">
            <div className="flex items-center">
              <FaLaptop className="text-4xl mr-2 text-amber-500" />
              <p className="logo-text text-3xl text-black">FreelanceHub</p>
            </div>
            <p className="text-md font-semibold text-black text-center px-6">
              Connecting clients and freelancers worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
