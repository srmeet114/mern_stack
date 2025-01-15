import React from "react";
import { MdOutlineKeyboardArrowDown, MdPayments } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { RiUserLocationFill } from "react-icons/ri";

const ConfirmRide = (props) => {
  const values = props.getValues();
  const pickup = values.pickup;
  const destination = values.destination;

  return (
    <div>
      <h3
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="py-1 text-center flex justify-center w-[93%] absolute top-0"
      >
        <MdOutlineKeyboardArrowDown className="text-3xl text-[#dadada]" />
      </h3>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
      <div className="flex justify-between items-center flex-col gap-2">
        <img
          className="h-20"
          src="https://cdn-iejhi.nitrocdn.com/NMxJCeGVpcAQdhpVLEQLtsJQObyxxCrn/assets/images/optimized/rev-d36051c/www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-4 p-2 border-b-2">
            <RiUserLocationFill className="text-xl" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base text-gray-600 -mt-1">
                {pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2 border-b-2">
            <IoLocationSharp className="text-xl" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-base text-gray-600 -mt-1">
                {destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2">
            <MdPayments className="text-xl" />
            <div>
              <h3 className="text-lg font-medium">
                ₹{props.fare[props.vehiclrType]}
              </h3>
              <p className="text-base text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setLookingForDriver(true),
              props.setConfirmRidePanel(false),
              props.createRide();
          }}
          className="w-full mt-5 bg-green-600 active:bg-green-700 text-white font-semibold p-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
