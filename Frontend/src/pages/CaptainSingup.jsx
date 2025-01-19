import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CaptainDataContext from "../context/CaptainContext";
import { CaptainsRegister } from "../server/api/api";
import { toast } from "react-toastify";

const CaptainSignup = () => {
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

  const onSubmit = (data) => {
    const Data = {
      fullname: {
        firstname: data.firstName,
        lastname: data.lastName,
      },
      email: data.email,
      password: data.password,
      vehicle: {
        color: data.vehicleColor,
        plate: data.vehiclePlate,
        capacity: data.vehicleCapacity,
        vehicleType: data.vehicleType,
      },
    };
    CaptainsRegister(reset, Data, navigate, notify, notifyerr, setCaptain, setLoading);
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://w7.pngwing.com/pngs/801/240/png-transparent-uber-hd-logo.png"
          alt=""
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex">
            <div className="mr-2 1/2">
              <input
                className="bg-[#eeeeee] rounded w-full px-4 py-2 border text-md placeholder:text-base"
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
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="ml-2 1/2">
              <input
                className="bg-[#eeeeee] rounded w-full px-4 py-2 border text-md placeholder:text-base"
                type="text"
                placeholder="Last name"
                autoComplete="username"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2 mt-4">What's your Email</h3>
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
          <h3 className="text-lg font-medium mb-2 mt-4">Vehicle Information</h3>
          <div className="flex">
            <div className="mr-2 w-1/2">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base"
                type="text"
                placeholder="Vehicle Color"
                {...register("vehicleColor", {
                  required: "Vehicle color is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              {errors.vehicleColor && (
                <p className="text-red-500">{errors.vehicleColor.message}</p>
              )}
            </div>
            <div className="ml-2 w-1/2">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base"
                type="text"
                placeholder="Vehicle Plate"
                {...register("vehiclePlate", {
                  required: "Vehicle plate is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              {errors.vehiclePlate && (
                <p className="text-red-500">{errors.vehiclePlate.message}</p>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="mr-2 w-1/2">
              <input
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base mt-4"
                type="number"
                placeholder="Vehicle Capacity"
                {...register("vehicleCapacity", {
                  required: "Vehicle capacity is required",
                })}
              />
              {errors.vehicleCapacity && (
                <p className="text-red-500">{errors.vehicleCapacity.message}</p>
              )}
            </div>
            <div className="ml-2 w-1/2">
              <select
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-md placeholder:text-base mt-4"
                {...register("vehicleType", {
                  required: "Vehicle type is required",
                })}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
              {errors.vehicleType && (
                <p className="text-red-500">{errors.vehicleType.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#111] mt-7 text-[#fff] font-medium rounded-lg mb-4 px-4 py-2 border w-full text-lg placeholder:text-base flex justify-center items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#fff]" />
            ) : (
              "Signup"
            )}
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

export default CaptainSignup;
