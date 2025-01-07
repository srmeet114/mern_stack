import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LocationserchPanel from "../components/LocationserchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpne, setVehiclePanelOpne] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false)

  const panelRef = useRef(null);
  const pamelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const watingforDriverRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          opacity: 1,
          padding: "24px",
        });
        gsap.to(pamelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          opacity: 0,
          padding: "0px",
        });
        gsap.to(pamelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpne) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpne]
  );

  useGSAP(
    function () {
      if (lookingForDriver) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriver]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (waitingDriver) {
        gsap.to(watingforDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(watingforDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://w7.pngwing.com/pngs/801/240/png-transparent-uber-hd-logo.png"
        alt=""
      />
      <div
        onClick={() => {
          setVehiclePanelOpne(false);
        }}
        className="h-screen w-screen"
      >
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={pamelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-3xl"
          >
            <MdOutlineKeyboardArrowDown />
          </h5>
          <h4 className="text-3xl font-semibold ">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              onClick={() => {
                setPanelOpen(true);
              }}
              type="text"
              placeholder="Add a pick-up location"
              value={pickup}
              onChange={(e) => setpickup(e.target.value)}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              onClick={() => {
                setPanelOpen(true);
              }}
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationserchPanel
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanelOpne}
            setVehiclePanel={setVehiclePanelOpne}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 bg-white py-10 translate-y-full px-3 w-full pt-12"
      >
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanelOpne={setVehiclePanelOpne}/>
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 bg-white py-6 translate-y-full px-3 w-full pt-12"
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setLookingForDriver={setLookingForDriver}/>
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed z-10 bottom-0 bg-white py-6 translate-y-full px-3 w-full pt-12"
      >
        <LookingForDriver setLookingForDriver={setLookingForDriver}/>
      </div>
      <div
        ref={watingforDriverRef}
        className="fixed z-10 bottom-0 bg-white translate-y-full py-6 px-3 w-full pt-12"
      >
        <WaitingForDriver setWaitingDriver={setWaitingDriver}/>
      </div>
    </div>
  );
};

export default Home;
