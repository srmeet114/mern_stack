import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SinupUser } from "../server/api/api";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate()
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);

  const onSubmit = (data) => {
    const Sinupdata = {
      fullname: {
        firstname: data.firstName,
        lastname: data.lastName
      },
      email: data.email,
      password: data.password
    };
    SinupUser(Sinupdata,reset,navigate,notify,notifyerr,setUser)
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://w7.pngwing.com/pngs/801/240/png-transparent-uber-hd-logo.png"
          alt=""
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-medium mb-2">What's Your name</h3>
          <div className="flex">
            <input
              className="bg-[#eeeeee] rounded mr-2 px-4 py-2 border w-1/2 text-md placeholder:text-base"
              type="text"
              placeholder="First name"
              autoComplete="username"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname.message}</p>
            )}
            <input
              className="bg-[#eeeeee] rounded ml-2 px-4 py-2 border w-1/2 text-md placeholder:text-base"
              type="text"
              placeholder="Last name"
              autoComplete="username"
              {...register("lastName", {
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname.message}</p>
            )}
          </div>
          <h3 className="text-lg font-medium mb-2 mt-4">What's Your Email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base"
            type="email"
            placeholder="Enter Your email"
            autoComplete="username"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <h3 className="text-lg font-medium mb-2 mt-4">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base"
            type="password"
            placeholder="Enter Your Password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button className="bg-[#111] mt-7 text-[#fff] font-medium rounded-lg mb-4 px-4 py-2 border w-full text-lg placeholder:text-base">
            Create account
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[11px] mt-5 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
