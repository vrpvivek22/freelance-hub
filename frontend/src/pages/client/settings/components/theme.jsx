import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);

    localStorage.setItem("theme", newTheme ? "dark" : "light");

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold px-6 py-4">Appearance</h2>
      <div className="flex items-center space-x-4 px-7 py-4">
        <span className="font-semibold sm:text-lg text-md">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className={`sm:w-9 sm:h-5 w-7 h-4 flex items-center rounded-full ${
            darkMode ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`bg-white sm:w-4 sm:h-4 w-3 h-3 rounded-full transform duration-300 ${
              darkMode ? "translate-x-4.5" : "translate-x-0.5"
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
}
