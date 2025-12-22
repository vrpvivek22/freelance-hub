import UserRedirect from "@/components/userRedirect";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const [role, setRole] = useState(null);
  const [showRedirect, setShowRedirect] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("newUser");

  function handleContinue() {
    if (!role) return;

    if (user === "true") {
      if (role === "client") navigate("/client/details");
      else navigate("/freelancer/profile");
    } else {
      setShowRedirect(true);
    }
  }

  return (
    <div className="flex flex-col bg-white min-h-screen items-center justify-center ">
      <div className="flex flex-row  justify-center items-center space-x-10 my-5 -mt-10">
        <div
          onClick={() => setRole("client")}
          className="border-4 border-gray-700 h-50 w-70 rounded-2xl p-10 cursor-pointer"
        >
          <label className="cursor-pointer">
            <input
              type="radio"
              className="accent-black h-6 w-6 cursor-pointer"
              value="client"
              name="role"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />
            <p className="font-semibold text-lg mt-2">I'm here to hire </p>
            <span className="font-semibold text-lg">(client)</span>
          </label>
        </div>
        <div
          onClick={() => setRole("freelancer")}
          className="border-4 border-gray-700 h-50 w-70 rounded-2xl p-10 cursor-pointer"
        >
          <label className="cursor-pointer">
            <input
              type="radio"
              className="accent-black h-6 w-6 cursor-pointer"
              checked={role === "freelancer"}
              onChange={() => setRole("freelancer")}
              value="freelancer"
              name="role"
            />
            <p className="font-semibold text-lg mt-2">I'm here to work</p>
            <span className="font-semibold text-lg">(freelancer)</span>
          </label>
        </div>
      </div>
      <div className="relative transition">
        {role && (
          <button
            onClick={handleContinue}
            className="flex flex-row items-center pl-6 pr-5 py-2 absolute top-6 -right-16 bg-green-600 text-white font-semibold rounded-sm hover:bg-green-700 cursor-pointer transition"
          >
            Continue
            <FaArrowRight className="ml-2 mt-1" />
          </button>
        )}
      </div>

      {showRedirect && <UserRedirect role={role} />}
    </div>
  );
}
