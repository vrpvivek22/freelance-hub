import createFreelancerProfileApi from "@/services/freelancer/freelancer-profile";
import uploadfreelancerImageApi from "@/services/freelancer/image";
import SkillInput from "@/utils/skills-section";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FreelancerProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setErrors({});

      let uploadedImageUrl = null;

      if (profileImage) {
        try {
          const formData = new FormData();
          formData.append("image", profileImage);

          const uploadRes = await uploadfreelancerImageApi(formData);
          uploadedImageUrl = uploadRes?.image?.url;
        } catch (imgErr) {
          setErrors({ profileImage: "Failed to upload image" });
          return;
        }
      }

      const body = {
        name,
        title,
        skills,
        description,
        hourlyRate,
        country,
        profileImage: uploadedImageUrl || null,
      };
      const res = await createFreelancerProfileApi(body);
      alert(res.message);
      console.log(res);
      navigate("/freelancer/dashboard");
    } catch (error) {
      if (error.response?.data?.errors) {
        const fieldErrors = {};
        error.response.data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
        return;
      }
      setErrors({ general: "Something went wrong" });
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200 px-2 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="relative lg:max-w-6xl max-w-full mx-auto pl-4 px-5 sm:px-14 pb-18 pt-6 sm:pt-10 my-8 sm:my-14 space-y-4 sm:space-y-1 space-x-0 sm:space-x-8 rounded-2xl shadow-xl bg-white w-full"
        >
          <div className="flex flex-col lg:w-5xl lg:flex-row mt-4 mr-0 lg:mr-15">
            <div className="flex flex-col mr-0 lg:mr-17 mt-3 ml-0 lg:ml-2 items-center">
              {profileImage ? (
                <div className="relative mr-1">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Preview"
                    className="w-[108px] h-28 object-cover rounded-full border cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="absolute -top-2 -right-4 bg-red-600 hover:bg-red-600 cursor-pointer text-white rounded-full w-6 h-6"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <input
                  className="rounded-full bg-gray-400 text-gray-100 h-28 w-28 text-lg pt-10 pl-4 cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              )}
              <label className="mt-2 sm:absolute font-semibold sm:left-18 sm:top-47 text-center">
                Profile Picture
                <p className="text-xs text-gray-600 mt-2 sm:-ml-7">
                  (Maximum image size 10 MB)
                </p>
              </label>
              {errors.profileImage && (
                <p className="text-xs text-red-600">⚠{errors.profileImage}</p>
              )}
            </div>

            {errors.general && (
              <div className="flex text-red-600 text-sm justify-center lg:justify-start">
                ⚠{errors.general}
              </div>
            )}

            <div className="flex flex-col w-full sm:w-96 mt-3 ml-0 sm:ml-5 lg:ml-12">
              <label className="font-semibold my-1">Name *</label>
              <input
                className="border-[0.2px] border-gray-400 px-4 py-1.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-800 transition"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">⚠{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col mt-3 ml-0 sm:ml-8 w-full lg:w-98">
              <label className="font-semibold my-1">Title *</label>
              <input
                className="border-[0.2px] border-gray-400 w-full lg:w-98 px-4 py-1.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                value={title}
                type="title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the title"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">⚠{errors.title}</p>
              )}
            </div>
          </div>

          <div className="relative lg:w-[800px] flex flex-col ml-0 lg:ml-58 mb-10">
            <label className="font-semibold my-1">Description *</label>
            <textarea
              className="border-[0.2px] border-gray-400 px-3 py-1.5 h-60 resize-none w-full  hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your top skills , strengths , services and experiences"
            />
            {errors.description && (
              <p className="text-red-600 text-sm absolute -bottom-6">
                ⚠{errors.description}
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row ml-0 lg:ml-58 lg:w-[800px] -mt-2 gap-6 lg:space-x-[45px]">
            <div className="relative flex flex-col">
              <SkillInput skills={skills} setSkills={setSkills} />
              {errors.skills && (
                <p className="text-red-600 text-sm absolute top-19 ">
                  ⚠{errors.skills}
                </p>
              )}
            </div>

            <div className="relative flex flex-col">
              <label className="font-semibold my-1">Hourly Rate *</label>
              <input
                className="border-[0.2px] border-gray-400 px-4 py-1.5 w-full sm:w-86.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                value={hourlyRate}
                type="number"
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="Enter Hourly Rate"
              />
              {errors.hourlyRate && (
                <p className="text-red-600 text-sm absolute top-18">
                  ⚠{errors.hourlyRate}
                </p>
              )}
            </div>
          </div>

          <div className="relative flex flex-col lg:flex-row ml-0 lg:ml-58 lg:w-md space-y-6 lg:space-y-0 lg:space-x-[45px] mt-8">
            <div className="flex flex-col">
              <label className="font-semibold my-1">Country *</label>
              <input
                className="border-[0.2px] border-gray-400 px-4 py-1.5 lg:w-sm sm:w-md hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your Country"
              />
              {errors.country && (
                <p className="text-red-600 text-sm absolute top-18">
                  ⚠{errors.country}
                </p>
              )}
            </div>
          </div>

          <div className="flex relative justify-center lg:justify-end">
            <button
              type="submit"
              className="font-semibold lg:absolute lg:right-3 bottom-0 bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 mt-10 cursor-pointer text-white px-8 py-1 text-lg rounded"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FreelancerProfile;
