import React, { useState } from "react";
import { Shopping } from "../types/Shopping";
import { FaArrowRight, FaCalendar } from "react-icons/fa";

interface ShoppingProps {
  ShoppingDetails: Shopping;
}

const ShoppingHistory: React.FC<ShoppingProps> = ({ ShoppingDetails }) => {
  const { name, status, data } = ShoppingDetails;
  const [isHover, setIsHover] = useState(false);
  const statusColor =
    status?.toLowerCase() === "completed" ? "#56CCF2" : "#EB5757";

  const boxStyle = {
    boxShadow: isHover ? `10px 10px 20px ${statusColor}` : "5px 5px 15px rgba(0, 0, 0, 0.3)",
    transition: 'box-shadow 0.3s ease-in-out'
  };


  return ( 
    <div
      className="flex justify-between flex-nowrap items-start gap-2 w-[45rem] rounded-2xl bg-white shadow-lg py-[1rem] px-[1.2rem] transition-shadow duration-400 ease-out"
      style={boxStyle}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <span className="text-[#000000] font-medium text-[16px] leading-5">
        {name}
      </span>
      <div className="flex items-center gap-3">
        <FaCalendar className="w-4 h-4 transition-colors duration-300 ease-out mt-1 text-[#C1C1C4]" />
        <span className="text-[#C1C1C4] font-medium leading-[15px]">
          {data}
        </span>
        <span
          className="font-medium leading-[15px] text-[12px] border border-solid rounded-[8px] px-2 "
          style={{ color: statusColor, borderColor: statusColor }}
        >
          {status}
        </span>
        <FaArrowRight className="w-4 h-4 transition-colors duration-300 ease-out mt-1 cursor-pointer fill-[#F9A109]"/>
      </div>
    </div>
  );
};

export default ShoppingHistory;
