import { loginFormControls } from "@/config/auth";
import { useAuth } from "@/context/authcontext";
import callLoginUserApi from "@/services/auth/logincall";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
    loginFormControls.reduce((acc, c) => {
      acc[c.id] = "";
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
      const response = await callLoginUserApi({
        email: formData.email,
        password: formData.password,
      });

      if (response?.token && response?.user) {
        login(response.user, response.token);

        navigate("/RoleSelection");

        localStorage.setItem("newUser", "false");
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
    <div className="flex flex-col mt-12 w-80 items-center">
      <h3 className="font-bold text-2xl mb-10">Welcome Back</h3>
      <form
        onSubmit={handleSubmit}
        className=" mx-auto w-80 space-y-3 rounded "
      >
        {loginFormControls.map((control) => (
          <div
            key={control.id}
            className="flex flex-col relative max-w-2xl pb-6"
          >
            <input
              id={control.id}
              type={control.type}
              placeholder={control.placeholder}
              value={formData[control.id] || ""}
              onChange={handleChange}
              className="border-[0.2px] border-gray-400 px-4 py-2.5 hover:ring-[0.3px] hover:ring-gray-900 rounded focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 transition"
            />
            {errors[control.id] && (
              <p className="absolute left-2 bottom-0 flex items-center text-red-600 text-sm">
                ⚠{errors[control.id]}
              </p>
            )}
          </div>
        ))}
        {errors.general && (
          <div className=" flex items-center -mt-8 ml-2 text-red-600 text-sm ">
            ⚠{errors.general}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 rounded text-white text-xl font-semibold w-80 py-2 mb-6.5 mt-2 cursor-pointer hover:bg-blue-600"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
