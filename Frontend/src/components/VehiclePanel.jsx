import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const VehiclePanel = (porps) => {
  return (
    <div>
      <h3
        onClick={() => {porps.setVehiclePanelOpne(false)}}
        className="py-1 text-center flex justify-center w-[93%] absolute top-0"
      >
        <MdOutlineKeyboardArrowDown className="text-3xl text-[#dadada]" />
      </h3>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div onClick={()=>{porps.setConfirmRidePanel(true),porps.selectVehicle('car')}} className="flex items-center border-2 mb-2 bg-gray-50 active:border-black rounded-xl p-3 justify-between">
        <img
          className="h-10"
          src="https://cdn-iejhi.nitrocdn.com/NMxJCeGVpcAQdhpVLEQLtsJQObyxxCrn/assets/images/optimized/rev-d36051c/www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium flex items-center text-sm gap-1">
            UberGo
            <FaUser className="" />4
          </h4>
          <h5 className="text-sm">2 mins away</h5>
          <p className="text-sm text-gray-600 ">Affordable,compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{porps.fare.car}</h2>
      </div>
      <div onClick={()=>{porps.setConfirmRidePanel(true),porps.selectVehicle('moto')}} className="flex items-center border-2 mb-2 bg-gray-50 active:border-black rounded-xl p-3 justify-between">
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium flex items-center text-sm gap-1">
            Moto
            <FaUser className="" />1
          </h4>
          <h5 className="text-sm">3 mins away</h5>
          <p className="text-sm text-gray-600 ">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{porps.fare.moto}</h2>
      </div>
      <div onClick={()=>{porps.setConfirmRidePanel(true),porps.selectVehicle('auto')}} className="flex items-center border-2 mb-2 bg-gray-50 active:border-black rounded-xl p-3 justify-between">
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium flex items-center text-sm gap-1">
            Moto
            <FaUser className="" />3
          </h4>
          <h5 className="text-sm">3 mins away</h5>
          <p className="text-sm text-gray-600 ">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{porps.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
