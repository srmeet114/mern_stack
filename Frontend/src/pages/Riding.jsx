import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

const Riding = () => {

  const location = useLocation()
  const ride = location.state?.ride 
  console.log("🚀 ~ Riding ~ ride:", ride)
  
  return (
    <div className="h-lvh">
      <Link to='/home' className="fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-3 left-3">
        <TiHomeOutline className="text-2xl"/>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://cdn-iejhi.nitrocdn.com/NMxJCeGVpcAQdhpVLEQLtsJQObyxxCrn/assets/images/optimized/rev-d36051c/www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select.jpeg"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-md font-medium capitalize">{ride.captain.fullname.firstname+" "+ride.captain.fullname.lastname}</h2>
            <h2 className="text-xl font-semibold -mt-2">MP04 AB 1234</h2>
            <p className="text-sm text-gray-600">maruti suzuki alto</p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-col gap-2">
          <div className="w-full mt-5">
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
        </div>
        <button className="w-full mt-5 bg-green-600 active:bg-green-700 text-white font-semibold p-2 rounded-lg">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
