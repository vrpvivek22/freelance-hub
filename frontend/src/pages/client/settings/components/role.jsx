import UserRedirect from "@/components/userRedirect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SwitchRole() {
  const [role, setRole] = useState("client");
  const [hasSelected, setHasSelected] = useState(false);

  function handleRole(value) {
    setRole(value);
    setHasSelected(true);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold px-6 py-4">Switch Role</h1>
      <div className="py-2 px-6 font-semibold space-x-4 flex flex-row">
        <label className="text-lg flex flex-row items-center">
          <input
            type="radio"
            value="client"
            name="role"
            checked={role === "client"}
            onChange={() => handleRole("client")}
            className="size-5 mr-2 cursor-pointer"
          />
          Hire
        </label>
        <label className="text-lg flex flex-row items-center">
          <input
            type="radio"
            value="freelancer"
            name="role"
            checked={role === "freelancer"}
            onChange={() => handleRole("freelancer")}
            className="size-5 mr-2 cursor-pointer"
          />
          work
        </label>
      </div>
      {hasSelected && role && <UserRedirect role={role} />}
    </div>
  );
}
