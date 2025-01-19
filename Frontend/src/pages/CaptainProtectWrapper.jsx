import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainGetProfile } from "../server/api/api";
import CaptainDataContext from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return null;
    }
    CaptainGetProfile(setCaptain, setLoading, navigate);
  }, [token]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#000]" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
