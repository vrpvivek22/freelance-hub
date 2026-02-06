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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <div
          onClick={() => setRole("client")}
          className={`border-4 rounded-2xl p-8 md:px-8 py-10 cursor-pointer w-72 transition
            ${
              role === "client"
                ? "border-green-600 shadow-lg scale-[1.02]"
                : "border-gray-600 hover:border-gray-800"
            }`}
        >
          <label className="cursor-pointer flex flex-col items-start">
            <input
              type="radio"
              className="accent-black h-5 w-5"
              checked={role === "client"}
              onChange={() => setRole("client")}
              name="role"
            />
            <p className="font-semibold text-lg mt-4">I'm here to hire</p>
            <span className="text-gray-600">(client)</span>
          </label>
        </div>

        <div
          onClick={() => setRole("freelancer")}
          className={`border-4 rounded-2xl p-8 md:px-8 py-10 cursor-pointer w-72 transition
            ${
              role === "freelancer"
                ? "border-green-600 shadow-lg scale-[1.02]"
                : "border-gray-600 hover:border-gray-800"
            }`}
        >
          <label className="cursor-pointer flex flex-col items-start">
            <input
              type="radio"
              className="accent-black h-5 w-5"
              checked={role === "freelancer"}
              onChange={() => setRole("freelancer")}
              name="role"
            />
            <p className="font-semibold text-lg mt-4">I'm here to work</p>
            <span className="text-gray-600">(freelancer)</span>
          </label>
        </div>
      </div>

      {role && (
        <button
          onClick={handleContinue}
          className="mt-10 flex items-center gap-2 px-8 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Continue
          <FaArrowRight />
        </button>
      )}

      {showRedirect && <UserRedirect role={role} />}
    </div>
  );
}
