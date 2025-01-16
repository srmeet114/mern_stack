import React, { useContext, useEffect, useRef, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import RidePopUp from "../../components/RidePopUp";
import CaptainDetails from "../../components/CaptainDetails";
import ConfirmRidePopUp from "../../components/ConfirmRidePopUp";
import { useSocket } from "../../context/SocketContext";
import { CaptainDataContext } from "../../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopPanel, setRidePopPanel] = useState(false);
  const [confirmRidePopPanel, setConfirmRidePopPanel] = useState(false);
  const [ride, setRide] = useState(null)
  const ridePopPanelRef = useRef(null);
  const confirmRidePopPanelRef = useRef(null);
  const { socket } = useSocket();
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain.captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain.captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    // return () => clearInterval(locationInterval);
  }, [captain.captain, socket]);

  socket.on('new-ride',(data)=>{
    setRide(data)
    setRidePopPanel(true)
  })

  const confirmRide = async () =>{
    
    const token = localStorage.getItem("token")
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
      rideId:ride._id,
      captainId:captain.captain._id,
    },{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    
    socket.emit('confirm-ride',{
      userId: captain.captain._id,
      rideId: ride._id
    })
  }

  useGSAP(
    function () {
      if (ridePopPanel) {
        gsap.to(ridePopPanelRef.current, {
          transform: "translateY(0)",
          opacity: 1,
        });
      } else {
        gsap.to(ridePopPanelRef.current, {
          transform: "translateY(100%)",
          opacity: 0,
        });
      }
    },
    [ridePopPanel]
  );
  useGSAP(
    function () {
      if (confirmRidePopPanel) {
        gsap.to(confirmRidePopPanelRef.current, {
          transform: "translateY(0)",
          opacity: 1,
        });
      } else {
        gsap.to(confirmRidePopPanelRef.current, {
          transform: "translateY(100%)",
          opacity: 0,
        });
      }
    },
    [confirmRidePopPanel]
  );

  return (
    <div className="h-screen">
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

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-4">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopPanel={setConfirmRidePopPanel}
          setRidePopPanel={setRidePopPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
