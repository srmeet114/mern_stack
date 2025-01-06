import React from "react";
import { LogoutUser } from "../server/api/api";

const UserLogout = () => {
  LogoutUser();

  return <div></div>;
};

export default UserLogout;
