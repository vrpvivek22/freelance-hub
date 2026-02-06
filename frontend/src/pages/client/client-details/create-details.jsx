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
      <div className="flex min-h-screen justify-center bg-gradient-to-br from-blue-200 to-indigo-200 px-4">
        <div className="w-full flex justify-center my-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-4xl bg-white shadow-xl rounded-2xl px-4 sm:px-6 md:px-10 py-8"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative flex flex-col items-center">
                {profileImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Preview"
                      className="w-28 h-28 object-cover rounded-full border"
                    />
                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
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

                <label className="mt-2 text-center font-semibold">
                  Profile Picture
                  <p className="text-xs text-gray-600 mt-1">
                    (Maximum image size 10 MB)
                  </p>
                </label>

                {errors.profileImage && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠ {errors.profileImage}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label className="font-semibold mb-1">Name *</label>
                <input
                  className="border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">⚠ {errors.name}</p>
                )}
              </div>
            </div>

            {errors.general && (
              <p className="text-red-600 text-sm mt-4">⚠ {errors.general}</p>
            )}

            <div className="flex flex-col mt-6 md:ml-38">
              <label className="font-semibold mb-1">Description *</label>
              <textarea
                className="border border-gray-400 px-4 py-2 h-32 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description about yourself or your company"
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  ⚠ {errors.description}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6 md:ml-38 md:mt-10">
              <div className="flex flex-col w-full">
                <label className="font-semibold mb-1">Client Type *</label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled hidden>
                    Select client type
                  </option>
                  <option value="individual">Individual</option>
                  <option value="agency">Agency</option>
                  <option value="company">Company</option>
                </select>
                {errors.clientType && (
                  <p className="text-sm text-red-600 mt-1">
                    ⚠ {errors.clientType}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-full">
                <label className="font-semibold mb-1">Country *</label>
                <input
                  className="border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="text-sm text-red-600 mt-1">
                    ⚠ {errors.country}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8 md:mt-12">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-2 rounded font-semibold"
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
