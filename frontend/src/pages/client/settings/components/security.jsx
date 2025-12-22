import { useAuth } from "@/context/authcontext";
import changePassword from "@/services/auth/change-password";
import { useState } from "react";

export default function ChangePassword() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(formData, token);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Error changing password");
    }
  };

  return (
    <div className=" px-4 py-4">
      <h2 className="text-3xl font-bold mb-8">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-2 border-[0.2px] border-gray-400 rounded focus:outline-1 focus:outline-gray-600"
          value={formData.currentPassword || ""}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border-[0.2px] border-gray-400 rounded focus:outline-1 focus:outline-gray-600"
          value={formData.newPassword || ""}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border-[0.2px] border-gray-400 rounded focus:outline-1 focus:outline-gray-600"
          value={formData.confirmPassword || ""}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
