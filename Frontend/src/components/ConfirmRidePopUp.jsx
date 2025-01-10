import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdPayments } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ConfirmRidePopUp = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = (data) => {
    console.log(data);
    navigate('/captainriding')
  };

  return (
    <div>
      <h3
        onClick={() => {
          props.setConfirmRidePopPanel(false);
        }}
        className="py-1 text-center flex justify-center w-[93%] absolute top-0"
      >
        <MdOutlineKeyboardArrowDown className="text-3xl text-[#dadada]" />
      </h3>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex justify-between items-center mt-2 bg-yellow-300 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/236x/a5/67/94/a567940c61eb580455d8f886f55d21b1.jpg"
            alt=""
          />
          <h2 className="text-xl font-medium">Harsh Patel</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex justify-between items-center flex-col gap-2">
        <div className="w-full mt-5">
          <div className="flex items-center gap-4 p-2 border-b-2">
            <RiUserLocationFill className="text-xl" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base text-gray-600 -mt-1">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 border-b-2">
            <IoLocationSharp className="text-xl" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base text-gray-600 -mt-1">
                Kankariya Talab, Bhopal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2">
            <MdPayments className="text-xl" />
            <div>
              <h3 className="text-lg font-medium">192.20</h3>
              <p className="text-base text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <form onSubmit={handleSubmit(submitHandler)}>
            <input
              type="text"
              placeholder="Enter OTP"
              className="bg-[#eee] px-8 py-3 text-base rounded-lg w-full mt-5"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be at least 4 characters",
                },
              })}
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
            <button
              type="submit"
              className="w-full block bg-green-600 text-center active:bg-green-700 text-white font-semibold p-2 rounded-lg mt-5"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => {
                props.setConfirmRidePopPanel(false);
                props.setRidePopPanel(false);
              }}
              className="w-full bg-red-600 active:bg-red-500 text-white font-semibold p-2 rounded-lg mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
