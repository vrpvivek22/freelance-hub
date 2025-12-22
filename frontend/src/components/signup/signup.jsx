import { signUpFormControls } from "@/config/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authcontext";
import callSignUpUserApi from "@/services/auth/signupcall";

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    signUpFormControls.reduce((acc, control) => {
      acc[control.id] = "";
      return acc;
    })
  );

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    try {
      const response = await callSignUpUserApi({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response?.token && response?.user) {
        login(response.user, response.token);

        navigate("/RoleSelection");
        localStorage.setItem("newUser", "true");
      } else if (response?.errors) {
        const fieldErrors = {};
        response.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      } else if (response?.message) {
        setErrors({ general: response.message });
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const fieldErrors = {};

        error.response.data.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      } else {
        setErrors(["Something went wrong"]);
      }
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col mt-9 items-center">
      <h3 className="font-bold text-2xl mb-3">Create Account</h3>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-2 p-4 rounded "
      >
        {signUpFormControls.map((control) => (
          <div
            key={control.id}
            className="flex flex-col relative  max-w-2xl pb-6"
          >
            <input
              id={control.id}
              type={control.type}
              placeholder={control.placeholder}
              value={formData[control.id] || ""}
              onChange={handleChange}
              className="border-[0.2px] border-gray-400 px-4 py-2 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 transition"
            />
            {errors[control.id] && (
              <p className="absolute left-2 bottom-0 text-red-600 text-sm">
                ⚠{errors[control.id]}
              </p>
            )}
          </div>
        ))}
        {errors.general && (
          <div className=" flex items-center -mt-6 ml-1 text-red-600 text-xs ">
            ⚠{errors.general}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 rounded text-white text-xl font-semibold w-80 py-2 cursor-pointer hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
