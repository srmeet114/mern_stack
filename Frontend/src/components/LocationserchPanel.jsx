import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const LocationserchPanel = (props) => {
  const location = [
    "248, Nrear kapor's cage, Sheryians Codeing School, Bhopal",
    "258, Nrear Singhai's cage, Sheryians Codeing School, Bhopal",
    "12A, Nrear Maholtra's's cage, Sheryians Codeing School, Bhopal",
    "25S, Nrear Singhai's cage, Sheryians Codeing School, Bhopal",
  ];

  return (
    <div>
      {/* this is jsut a test */}
      <div>
        {location.map((e, index) => {
          return (
            <div key={index} onClick={()=>{props.setVehiclePanel(true),props.setPanelOpen(false)}}>
              <div className="flex gap-4 items-center my-4 justify-start border-2 border-gray-100 px-2 py-2 rounded-xl active:border-black">
                <h2 className="bg-[#eee] p-2 text-md rounded-full">
                  <IoLocationSharp />
                </h2>
                <h4 className="font-medium">{e}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationserchPanel;
