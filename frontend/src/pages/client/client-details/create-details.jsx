import createClientDetailsApi from "@/services/client/client-details";
import uploadClientImageApi from "@/services/client/image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientDetails() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientType, setClientType] = useState("");
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

          const uploadRes = await uploadClientImageApi(formData);
          uploadedImageUrl = uploadRes?.image?.url;
        } catch (imgErr) {
          setErrors({ profileImage: "Failed to upload image" });
          return;
        }
      }

      const body = {
        name,
        description,
        clientType,
        country,
        profileImage: uploadedImageUrl || null,
      };
      const res = await createClientDetailsApi(body);
      alert(res.message);
      navigate("/client/dashboard");
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
      <div className="flex min-h-screen justify-center bg-gradient-to-br from-blue-200 to-indigo-200">
        <div className="flex justify-center my-12">
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl px-10 pt-15 pb-20 space-x-5 mr-10 rounded-2xl bg-white shadow-xl"
          >
            <div className="flex flex-row ml-6 items-center">
              <div className="relative flex flex-col mr-18 items-center">
                {profileImage ? (
                  <div className="relative mr-1">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Preview"
                      className=" w-[119px] h-28 object-cover rounded-full border"
                    />
                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-600 cursor-pointer text-white rounded-full w-6 h-6"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <input
                    className="rounded-full bg-gray-400 text-gray-100 h-28 w-29 text-lg pt-10 pl-5 cursor-pointer"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                )}
                <label className="mt-2 absolute left-2 top-29 font-semibold">
                  Profile Picture
                  <p className="text-xs text-gray-600 mt-2">
                    (Maximum image size 10 MB)
                  </p>
                </label>
                {errors.profileImage && (
                  <p className="text-xs text-red-600">⚠{errors.profileImage}</p>
                )}
              </div>
              {errors.general && (
                <div className=" flex text-red-600 text-sm ">
                  ⚠{errors.general}
                </div>
              )}
              <div className="flex flex-col relative w-[620px] mb-8">
                <label className="font-semibold my-1">Name *</label>
                <input
                  className="border-[0.2px] border-gray-500 px-4 py-1.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                />
                {errors.name && (
                  <p className="text-sm absolute top-19 text-red-600">
                    ⚠{errors.name}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col relative w-[585px] ml-53 mb-8">
              <label className="font-semibold my-1">Description *</label>
              <textarea
                className="border-[0.2px] border-gray-500 px-3 py-2 h-50 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description about yourself or your company (optional)"
              />
              {errors.description && (
                <p className="text-sm absolute top-32 text-red-600">
                  ⚠{errors.description}
                </p>
              )}
            </div>
            <div className="flex flex-row ml-53 mb-5">
              <div className="flex flex-col w-64 mr-27 ">
                <label className="font-semibold my-1">Client Type *</label>
                <select
                  value={clientType}
                  name="clientType"
                  onChange={(e) => setClientType(e.target.value)}
                  className="border-[0.2px] border-gray-500 px-4 py-1.5 bg-none  hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                >
                  <option value="" disabled hidden>
                    Select client type
                  </option>
                  <option value="individual" className="bg-none">
                    Individual
                  </option>
                  <option value="agency">Agency</option>
                  <option value="company">Company</option>
                </select>
                {errors.clientType && (
                  <p className="text-red-600 text-sm">⚠{errors.clientType}</p>
                )}
              </div>

              <div className="flex flex-col w-60 relative ">
                <label className="font-semibold my-1">Country *</label>
                <input
                  className="border-[0.2px] border-gray-500 px-4 py-1.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.2px] focus:ring-blue-500 transition"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="text-red-600 absolute top-18 text-sm">
                    ⚠{errors.country}
                  </p>
                )}
              </div>
            </div>

            <div className="flex relative mt-11">
              <button
                type="submit"
                className="absolute right-5 font-semibold top-0 bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 text-white px-6 py-1.5 text-lg rounded cursor-pointer"
              >
                Finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientDetails;
