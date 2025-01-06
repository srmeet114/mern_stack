import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainGetProfile } from "../server/api/api";
import CaptainDataContext from "../context/CaptainContext";

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const {captain, setCaptain} = useContext(CaptainDataContext);
    const {loading, setLoading} = useState(true);
  
    useEffect(() => {
      if (!token) {
        navigate("/captain-login");
        return null;
      }
    }, [token]);

    useEffect(() => {
      CaptainGetProfile(setCaptain, setLoading, navigate);
    }, []);

    if (loading) {
      return (
        <div>Loading...</div>
      )
    }
  
    return <div>{children}</div>;
}

export default CaptainProtectWrapper
