import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const LocationserchPanel = (props) => {
  const handleSuggestionClick = (suggestion) => {
    if (props.activeField === 'pickup') {
      props.setPickup(suggestion.description);
    } else if (props.activeField === 'destination') {
      props.setDestination(suggestion.description);
    }
    // props.setPanelOpen(null);
    // props.setVehiclePanel(true);
  };

  return (
    <div>
      <div>
        {props.suggestions.map((suggestion, index) => {
          return (
            <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <div className="flex gap-4 items-center my-4 justify-start border-2 border-gray-100 px-2 py-2 rounded-xl active:border-black">
                <h2 className="bg-[#eee] p-2 text-md rounded-full">
                  <IoLocationSharp />
                </h2>
                <h4 className="font-medium">{suggestion.description}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationserchPanel;