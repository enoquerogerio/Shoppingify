import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ItemInfo = ({ onBackClick, item }: any) => {
  return (
    <>
      <div className="bg-[#f1f1f5] w-[25%] min-h-screen h-full py-0 px-5 fixed right-0">
        <Link
          to={"/items"}
          className="flex items-center gap-3 mt-4"
          onClick={onBackClick}
        >
          {" "}
          <FaArrowLeft className="w-4 h-4 transition-colors duration-300 ease-out cursor-pointer fill-[#F9A109]" />
          <span className="font-bold leading-[17px] text-[14px] text-[#F9A109]">
            back
          </span>
        </Link>
        <div className="mt-4 flex flex-col relative w-full h-full pb-14">
          <div className="flex items-center justify-start flex-nowrap mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg"
              className="w-48 h-40 rounded-[12px] border-[2px] border-solid boder-[#BDBDBD]"
            />
          </div>
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[12px] font-medium text-[#C1C1C4] leading-[15px]">
              Name
            </label>
            <span className="text-[24px] font-medium text-black py-[1rem] -mt-2 leading-[30px]">
              {item.name}
            </span>
          </div>
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[12px] font-medium text-[#C1C1C4] leading-[15px]">
              Category
            </label>
            <span className="text-[18px] font-medium text-black py-[1rem] -mt-2 leading-[22px]">
            {item.category}
            </span>
          </div>
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[12px] font-medium text-[#C1C1C4] leading-[15px]">
              Note
            </label>
            <textarea
              disabled
              rows={4}
              className="h-40 resize-none text-[18px] font-medium text-black mt-2 leading-[22px] outline-none bg-transparent overflow-y-scroll"
            >
              {item.note}
            </textarea>
          </div>
          <div className="flex items-center justify-center gap-10 ">
            <button className="text-[16px] font-bold leading-[20px] text-[#34333A]">
              delete
            </button>
            <button
              type="submit"
              className="bg-[#F9A109] text-white text-[16px] font-bold rounded-[12px] py-3 px-3 leading-[20px] mb-2"
            >
              Add to list
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemInfo;
