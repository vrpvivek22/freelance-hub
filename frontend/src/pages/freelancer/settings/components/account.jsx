import { useAuth } from "@/context/authcontext";
import { useState } from "react";

export default function AccountManagement() {
  const { token, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteAccountApi(token);
      logout();

      alert("Your account has been deleted successfully!");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to delete account");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold px-6 py-4">Delete Account</h2>
      <p className="text-gray-600 dark:text-gray-400 px-6 py-2">
        Deleting your account is permanent and cannot be undone.
      </p>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-red-500 text-white px-4 py-2 mx-6 my-6 rounded hover:bg-red-600 cursor-pointer"
      >
        Delete My Account
      </button>
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-500">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to permanently delete your account?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 cursor-pointer hover:bg-gray-500 hover:text-white hover:dark:bg-gray-500 "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
