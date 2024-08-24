import { useState } from "react";
import AddNewItem from "./AddNewItem";
import source from "../assets/img/source.svg";

const Cart = () => {
  const [selectedItem, setSelectedItem] = useState<boolean | null>(null);

  const handleAddItemClick = () => {
    setSelectedItem(true);
  };

  const handleCancelClick = () => {
    setSelectedItem(false);
  };
  return (
    <>
      {selectedItem ? (
        <AddNewItem  onBackClick={handleCancelClick}/>
      ) : (
        <div className="flex flex-col items-center justify-between pb-14 bg-[#FFF0DE] w-[25%] min-h-screen flex-grow pt-4 px-5 fixed right-0">
          <div className="bg-[#80485B] rounded-[24px] py-2 flex items-center justify-around gap-14 relative mt-4 w-72">
            <img src={source} className="w-16 h-28 absolute left-2 -top-5" />
            <div className="flex flex-col items-start justify-start gap-2 -mr-14">
              <span className="text-white font-bold text-[16px] leading-[20px] w-[160px]">
                Didn’t find what you need?
              </span>
              <button onClick={() => handleAddItemClick()} className="bg-white text-[#34333A] font-bold text-[14px] leading-[17px] py-2 px-8 rounded-[12px] hover:bg-[#F9A109] hover:text-white">
                Add item
              </button>
            </div>
          </div>

          <div>
            <label className="text-[20px] font-bold text-[#34333A] leading-[25px]">
              No items
            </label>
          </div>
          <div className="flex items-center justify-center gap-10 relative">
            <input
              placeholder="Enter a name"
              type="text"
              name="name"
              className="text-[14px] font-medium text-[#80485B] rounded-[12px] border-[2px] border-solid boder-[#BDBDBD] py-[1rem] pl-[0.5rem] pr-16 outline-none"
            />
            <button
              type="submit"
              className="bg-[#F9A109] text-white text-[16px] font-bold rounded-[12px] py-[1.1rem] px-[1rem] leading-[20px] absolute right-[1px] "
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
