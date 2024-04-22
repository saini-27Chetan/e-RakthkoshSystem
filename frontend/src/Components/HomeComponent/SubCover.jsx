import React from "react";
import coverImage2 from "../../Images/background2.jpg";
import Table from "../HomeComponent/Table";
import Button from "../Button";
import { Link } from "react-router-dom";

function SubCover() {
  const requestPath = "/request/want%20to%20donate";

  return (
    <div className="grid bg-white justify-center grid-cols-2 my-2">
      <div className="w-full col-span-2 text-center">
        <div className="leading-10 font-bold text-4xl text-red-800">
          Learn About Donation
        </div>
      </div>

      <div className="w-50%">
        <img src={coverImage2} alt="Donation" className="w-full h-full" />
      </div>

      <Table />

      <div className="w-50%">
        <div className="mx-auto w-3/4 text-center">
          <div className="font-bold text-justify text-xl mb-4">
            After donating blood, the body works to replenish the blood loss.
            This stimulates the production of new blood cells and in turn, helps
            in maintaining good health.
          </div>

          <Link to={requestPath} className="relative left-1/3">
            <Button title={"Donate Now"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubCover;
