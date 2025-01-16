import React, { useRef, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link,useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";0
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import FinishRide from "../../components/FinishRide";

const CaptainRiding = (props) => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride
    console.log("🚀 ~ CaptainRiding ~ rideData:", rideData)

    useGSAP(
        function () {
          if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(0)",
            });
          } else {
            gsap.to(finishRidePanelRef.current, {
              transform: "translateY(100%)",
            });
          }
        },
        [finishRidePanel]
      );


  return (
    <div className="h-screen relative">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://w7.pngwing.com/pngs/801/240/png-transparent-uber-hd-logo.png"
          alt=""
        />
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <IoExitOutline className="text-2xl" />
        </Link>
      </div>

      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/5 p-6 flex items-center justify-between bg-yellow-300 relative" onClick={()=>{setFinishRidePanel(true)}}>
        <h3
          className="p-1 text-center w-[90%] flex items-center justify-center absolute top-0"
        >
          <MdOutlineKeyboardArrowUp className="text-3xl text-[#fff]" />
        </h3>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className="bg-green-600 text-center active:bg-green-700 text-white font-semibold p-2 rounded-lg px-10">
          Complate Ride
        </button>
      </div>
      <div ref={finishRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <FinishRide rideData={rideData} setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
