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
      <h2 className="text-3xl font-bold px-6 py-4">Appearance</h2>
      <div className="flex items-center space-x-4 px-7 py-4">
        <span className="font-semibold text-lg">Dark Mode</span>
        <button
          onClick={toggleTheme}
          className={`w-9 h-5 flex items-center rounded-full ${
            darkMode ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`bg-white w-4 h-4 rounded-full transform duration-300 ${
              darkMode ? "translate-x-4.5" : "translate-x-0.5"
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
}
