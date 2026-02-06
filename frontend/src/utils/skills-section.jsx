import React, { useState } from "react";

export default function SkillInput({ skills, setSkills }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();

      if (skills.includes(input.trim())) return;

      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div>
      <label className="block font-semibold my-1">Skills *</label>

      <div className="flex flex-wrap gap-2 rounded p-2 lg:w-sm w-full min-h-10 border-[0.2px] z-30 border-gray-500 px-4 py-1.5 hover:ring-[0.3px] hover:ring-gray-900 focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-blue-600 text-white px-3 py-1 lg:w-sm rounded-full"
          >
            <span>{skill}</span>
            <button
              className="ml-2 text-white font-bold cursor-pointer"
              onClick={() => removeSkill(skill)}
            >
              ✕
            </button>
          </div>
        ))}

        <input
          type="text"
          className="outline-none flex-grow min-w-[180px] z-50 "
          placeholder="Type a skill and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
