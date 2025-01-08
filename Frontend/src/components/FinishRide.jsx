import React from "react";
import { MdOutlineKeyboardArrowDown, MdPayments } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      <h3
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="py-1 text-center flex justify-center w-[93%] absolute top-0"
      >
        <MdOutlineKeyboardArrowDown className="text-3xl text-[#dadada]" />
      </h3>
      <h3 className="text-2xl font-semibold mb-5">
        Finish this Rede
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
            <Link
              to="/captain-home"
              className="w-full block bg-green-600 text-center active:bg-green-700 text-white font-semibold p-2 rounded-lg mt-2"
            >
              Finis Ride
            </Link>
            <p className="mt-6 text-xs text-center">click on finish ride button if you have completed the payment</p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
