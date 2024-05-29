import React from "react";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (
    <>
      <footer className="bg-lime-700 text-white h-12 px-4 md:px-12 text-center flex flex-row items-center justify-between">
        <p className="font-semibold text-sm md:text-base">PRAVINYA INFOTECH HUBBALLI</p>
        <div className="flex flex-row text-lg md:text-2xl gap-3 md:gap-5">
          <a href={"https://github.com/anoop1718/CropMaster/tree/master/CropConnect-main"} target="_blank">
            <FaGithub />
          </a>

        </div>
      </footer>
    </>
  );
};

export default Footer;
