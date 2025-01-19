import React from "react";
import { LogoutUser } from "../server/api/api";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  LogoutUser(navigate);

  return <div></div>;
};

export default UserLogout;
