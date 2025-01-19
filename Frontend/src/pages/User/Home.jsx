import React, { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import LocationserchPanel from "../../components/LocationserchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmRide from "../../components/ConfirmRide";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingForDriver";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createRides, FindTrips, logoutUsers } from "../../server/api/api";
import { useSocket } from "../../context/SocketContext";
import { UserDataContext} from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../../components/LiveTracking";
import { IoExitOutline } from "react-icons/io5";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(null);
  const [vehiclePanelOpne, setVehiclePanelOpne] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitingDriver, setWaitingDriver] = useState(false);
  const [btnSow, setbtnSow] = useState(false);
  const [fare, setFare] = useState({});

  const panelRef = useRef(null);
  const pamelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const watingforDriverRef = useRef(null);
  const btnSowRef = useRef(null);

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

  useGSAP(
    function () {
      if (btnSow) {
        gsap.to(btnSowRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(btnSowRef.current, {
          opacity: 0,
        });
      }
    },
    [btnSow]
  );

  const { register, handleSubmit, setValue, getValues } = useForm();
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [vehiclrType, setvehiclrType] = useState(null);
  const [ride, setride] = useState(null)
  const {socket} = useSocket()
  const {user} = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if (user && socket) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  },[user, socket])

  socket.on('ride-confirmed',(ride)=>{
    setride(ride);
    setWaitingDriver(true)
  })

  socket.on('ride-started',(ride)=>{
    setWaitingDriver(false)
    navigate('/riding', { state: { ride} })
  })

  const fetchSuggestions = async (query, type) => {
    try {
      let response;
      if (type === "pickup") {
        response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: query },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: query },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching suggestions:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const findTrip = () => {
    setVehiclePanelOpne(true);
    setPanelOpen(false);

    const values = getValues();
    const pickup = values.pickup;
    const destination = values.destination;
    
    FindTrips(pickup, destination, setFare);
  };

  const createRide = () => {
    const values = getValues();
    const pickup = values.pickup;
    const destination = values.destination;
    const vehicleType = vehiclrType;
    createRides(pickup, destination, vehicleType);
  };

  const logOut = () =>{
    logoutUsers(navigate)
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen z-10">
        <img
          className="w-16"
          src="https://w7.pngwing.com/pngs/801/240/png-transparent-uber-hd-logo.png"
          alt=""
        />
        <button
          onClick={logOut}
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full cursor-pointer"
        >
          <IoExitOutline className="text-2xl" />
        </button>
      </div>
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
        {/* <LiveTracking /> */}
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h5
            ref={pamelCloseRef}
            onClick={() => {
              setPanelOpen(false);
              setbtnSow(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-3xl"
          >
            <MdOutlineKeyboardArrowDown />
          </h5>
          <h4 className="text-3xl font-semibold ">Find a trip</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              onClick={() => {
                setPanelOpen("pickup");
                setActiveField("pickup");
                setbtnSow(true);
              }}
              type="text"
              placeholder="Add a pick-up location"
              {...register("pickup", {
                onChange: (e) => {
                  setValue("pickup", e.target.value);
                  fetchSuggestions(e.target.value, "pickup");
                },
              })}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              onClick={() => {
                setPanelOpen("destination");
                setActiveField("destination");
              }}
              type="text"
              placeholder="Enter your destination"
              {...register("destination", {
                onChange: (e) => {
                  setValue("destination", e.target.value);
                  fetchSuggestions(e.target.value, "destination");
                },
              })}
            />
          </form>
          <button
            ref={btnSowRef}
            onClick={findTrip}
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationserchPanel
            setPanelOpen={setPanelOpen}
            vehiclePanel={vehiclePanelOpne}
            setVehiclePanel={setVehiclePanelOpne}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : activeField === "destination"
                ? destinationSuggestions
                : []
            }
            setPickup={(value) => setValue("pickup", value)}
            setDestination={(value) => setValue("destination", value)}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 bg-white py-10 translate-y-full px-3 w-full pt-12"
      >
        <VehiclePanel
          fare={fare}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpne={setVehiclePanelOpne}
          selectVehicle={setvehiclrType}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 bg-white py-6 translate-y-full px-3 w-full pt-12"
      >
        <ConfirmRide
          getValues={getValues}
          createRide={createRide}
          selectVehicle={setvehiclrType}
          fare={fare}
          vehiclrType={vehiclrType}
          setConfirmRidePanel={setConfirmRidePanel}
          setLookingForDriver={setLookingForDriver}
        />
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed z-10 bottom-0 bg-white py-6 translate-y-full px-3 w-full pt-12"
      >
        <LookingForDriver
          getValues={getValues}
          selectVehicle={setvehiclrType}
          pickupSuggestions={pickupSuggestions}
          destinationSuggestions={destinationSuggestions}
          fare={fare}
          vehiclrType={vehiclrType}
          setLookingForDriver={setLookingForDriver}
        />
      </div>
      <div
        ref={watingforDriverRef}
        className="fixed z-10 bottom-0 bg-white translate-y-full py-6 px-3 w-full pt-12"
      >
        <WaitingForDriver ride={ride} setWaitingDriver={setWaitingDriver} />
      </div>
    </div>
  );
};

export default Home;
