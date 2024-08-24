import React from "react";
import { Link } from "react-router-dom";
import { Item as ItemDetails } from "../types/Item";
import { FaPlus } from "react-icons/fa";

interface ItemProps {
  itemDetails: ItemDetails.Entity;
  onClick: any;
} 

const Item: React.FC<ItemProps> = ({ itemDetails, onClick }) => {
  const { name } = itemDetails;
  return (
    <div className="flex justify-between flex-nowrap items-start gap-2 text-[#80485B] w-[182px] rounded-2xl bg-white shadow-lg py-[1rem] px-[1.2rem] transition-shadow duration-400 ease-out hover:shadow-[#F9A109]">
      <Link
        to=""
        className="text-[#000000] font-medium text-[16px] leading-5 hover:text-[#F9A109]"
        onClick={onClick}
      >
        {name}
      </Link>
      <FaPlus className="w-4 h-4 transition-colors duration-300 ease-out hover:text-[#F9A109] mt-1 cursor-pointer" />
    </div>
  );
};

export default Item;
