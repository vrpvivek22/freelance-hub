import { useState } from "react";
import ChangePassword from "./components/security";
import ThemeToggle from "./components/theme";
import AccountManagement from "./components/account";
import SwitchRole from "./components/role";
import Footer from "@/pages/home/footer";

export default function ClientSettings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <>
      <div className="flex bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="flex flex-col md:flex-row mb-3 min-h-[670px] w-6xl mt-3 ml-46 rounded-lg shadow-[2px_0_6px_rgba(0,0,0,0.1)] bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="w-full md:w-1/5 rounded-l-lg bg-gradient-to-br from-gray-100 via-blue-100 to-indigo-100 dark:bg-gray-800 shadow-[2px_0_6px_rgba(0,0,0,0.2)]">
            <ul className="p-4 space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left p-2 rounded-lg cursor-pointer transition-all ${
                    activeTab === "account"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  Account Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left p-2 rounded-lg cursor-pointer transition-all ${
                    activeTab === "security"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  Password
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("theme")}
                  className={`w-full text-left p-2 rounded-lg cursor-pointer transition-all ${
                    activeTab === "theme"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  Appearance
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("role")}
                  className={`w-full text-left p-2 rounded-lg cursor-pointer transition-all ${
                    activeTab === "role"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "hover:bg-gray-500 hover:text-white dark:hover:bg-gray-700"
                  }`}
                >
                  Role
                </button>
              </li>
            </ul>
          </div>

          <div className="flex-1 p-6">
            {activeTab === "security" && <ChangePassword />}
            {activeTab === "account" && <AccountManagement />}
            {activeTab === "theme" && <ThemeToggle />}
            {activeTab === "role" && <SwitchRole />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
