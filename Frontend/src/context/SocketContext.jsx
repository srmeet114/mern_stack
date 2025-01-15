import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const socketUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const newSocket = io(socketUrl, {
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log(`Connected to server with socket ID: ${newSocket.id}`);
    });

    newSocket.on("disconnect", (res) => {
      console.log(`Disconnected from server: ${res}`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;