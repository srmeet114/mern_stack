import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CaptainsLogin } from "../server/api/api";
import { toast } from "react-toastify";
import CaptainDataContext from "../context/CaptainContext";

const CaptainLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const notify = (message) => toast.success(message);
  const notifyerr = (message) => toast.error(message);
  const [loading, setLoading] = useState(false);

  const onSubmit = (Data) => {
    CaptainsLogin(reset, Data, navigate, notify, notifyerr, setCaptain, setLoading);
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-10"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png"
          alt=""
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="Enter Your Email"
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

          <h3 className="text-xl mb-2 mt-7">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
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

          <button
            type="submit"
            className="bg-[#111] mt-7 text-[#fff] font-medium rounded-lg mb-4 px-4 py-2 border w-full text-lg placeholder:text-base flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#fff]" />
            ) : (
              "Login"
            )}
          </button>
          <p className="text-center">
            Join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-600 font-medium">
              Register as a Captain
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#6790f4] text-[#fff] flex justify-center font-medium rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base mt-5"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
