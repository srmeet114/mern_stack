import React from "react";
import { CiTimer } from "react-icons/ci";
import { PiSpeedometerLight } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-3">
          <img
            className="h-10 w-10 rounded-full "
            src="https://preview.redd.it/created-random-people-using-chatgpt-midjourney-do-you-know-v0-q1aa450i5dqb1.png?width=1024&format=png&auto=webp&s=c4e9abc47d193474a2fa1a7e337d9d9340dce947"
            alt=""
          />
          <h4 className="text-lg font-medium">Harsh </h4>
        </div>
        <div>
          <h4 className="text-xl font-bold">290.30</h4>
          <p className="text-sm font-medium text-gray-600">Eared</p>
        </div>
      </div>
      <div className="flex p-3 bg-gray-100 rounded-xl justify-center gap-5 items-start mt-5">
        <div className="flex justify-center flex-col items-center">
          <CiTimer className="text-3xl mb-2" />
          <h5 className="text-lg font-medium">10.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <PiSpeedometerLight className="text-3xl mb-2" />
          <h5 className="text-lg font-medium">10.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <SlNotebook className="text-3xl mb-2 pb-1" />
          <h5 className="text-lg font-medium">10.5</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
