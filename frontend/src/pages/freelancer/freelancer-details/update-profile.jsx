import { useRefresh } from "@/context/Refresh-context";
import {
  getFreelancerProfileApi,
  updateProfileApi,
} from "@/services/freelancer/freelancer-profile";
import uploadfreelancerImageApi from "@/services/freelancer/image";
import SkillInput from "@/utils/skills-section";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditFreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const { refreshFlag } = useRefresh();

  const [profileImage, setProfileImage] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setProfileImage(profile.profileImage || "");
      setTitle(profile.title || []);
      setSkills(profile.skills);
      setDescription(profile.description || "");
      setHourlyRate(profile.hourlyRate || "");
      setCountry(profile.country || "");
    }
  }, [profile]);

  useEffect(() => {
    async function load() {
      try {
        const profileRes = await getFreelancerProfileApi();
        setProfile(profileRes.profile);
      } catch (err) {
        console.error("Error loading client profile:", err);
      }
    }
    load();
  }, [refreshFlag]);

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setErrors({});

      let uploadedImageUrl = profileImage;

      if (newImageFile) {
        try {
          const formData = new FormData();
          formData.append("image", newImageFile);

          const uploadRes = await uploadfreelancerImageApi(formData);
          uploadedImageUrl = uploadRes?.data?.url;
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
        profileImage: uploadedImageUrl,
      };
      const res = await updateProfileApi(body);
      alert(res.message);

      setProfile(res.profile);
      setProfileImage(`${res.profile.profileImage}?t=${Date.now()}`);
      setNewImageFile(null);
      navigate("/freelancer/get/profile");
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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200">
      <form
        onSubmit={handleUpdate}
        className="relative max-w-full mx-auto pl-14 pb-18 pt-10 my-14 space-y-1 rounded-2xl shadow-xl bg-white"
      >
        <div className="flex flex-row mt-4 mr-15">
          <div className="flex flex-col mr-17 mt-3 ml-2 items-center">
            {profileImage || newImageFile ? (
              <div className="relative mr-1">
                <img
                  src={
                    newImageFile
                      ? URL.createObjectURL(newImageFile)
                      : profileImage
                  }
                  alt="Preview"
                  className=" w-[108px] h-28 object-cover rounded-full border cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => {
                    setProfileImage("");
                    setNewImageFile(null);
                  }}
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
                onChange={(e) => setNewImageFile(e.target.files[0])}
              />
            )}
            <label className="mt-2 absolute font-semibold left-17 top-46">
              Profile Picture
              <p className="text-xs text-gray-600 mt-2 -ml-7">
                (Maximum image size 10 MB)
              </p>
            </label>
            {errors.profileImage && (
              <p className="text-xs text-red-600">⚠{errors.profileImage}</p>
            )}
          </div>
          {errors.general && (
            <div className=" flex text-red-600 text-sm">⚠{errors.general}</div>
          )}
          <div className="flex flex-col w-96 mt-3 ml-5">
            <label className="font-semibold my-1">Name</label>
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
          <div className="flex flex-col  mt-3 ml-8">
            <label className="font-semibold my-1">Title</label>
            <input
              className="border-[0.2px] border-gray-400 w-96 px-4 py-1.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
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
        <div className="relative flex flex-col ml-52 mb-10">
          <label className="font-semibold my-1">Description</label>
          <textarea
            className="border-[0.2px] border-gray-400 px-3 py-1.5 h-60 w-[800px] hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
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
        <div className=" flex flex-row ml-52 -mt-2 space-x-[45px]">
          <div className="relative flex flex-col">
            <SkillInput skills={skills} setSkills={setSkills} />
            {errors.skills && (
              <p className="text-red-600 text-sm absolute top-19">
                ⚠{errors.skills}
              </p>
            )}
          </div>
          <div className=" relative flex flex-col">
            <label className="font-semibold my-1">Hourly Rate</label>
            <input
              className="border-[0.2px] border-gray-400 px-4 py-1.5 w-76.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
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
        <div className="relative flex flex-row ml-52 space-x-[45px] mt-8">
          <div className="flex flex-col">
            <label className="font-semibold my-1">Country</label>
            <input
              className="border-[0.2px] border-gray-400 px-4 py-1.5 w-sm hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
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
        <div className="relative">
          <button
            type="submit"
            className="font-semibold absolute right-30 bottom-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 mt-6 cursor-pointer text-white px-8 mr-20 py-1 text-lg rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/freelancer/get/profile")}
            className="font-semibold absolute right-15 bottom-1 bg-gradient-to-r from-red-600 to-red-500 hover:bg-gradient-to-r hover:from-red-700 hover:to-red-600 text-white px-8 py-1 text-lg rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditFreelancerProfile;
