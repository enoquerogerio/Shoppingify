import { MdOutlineSearch } from "react-icons/md";
const Header = () => {
  return (
    <div className="flex justify-between items-start -mb-16">
      <h1 className="text-black text-[26px] font-medium mb-20 mt-14 w-[450.29px]">
        <span className="font-bold text-[#F9A109]">Shoppingify</span> allows you
        take your shopping list wherever you go
      </h1>
      <div className="relative h-auto mt-11 border-none rounded-2xl shadow-lg">
        <input
          className="inline-block w-[15rem] h-[3.1825rem] text-2 font-medium border-none rounded-2xl pl-20 bg-white text-[#BDBDBD] outline-none"
          placeholder="search item"
        />
        <MdOutlineSearch className="h-10 w-10 absolute top-2 left-6 text-[#34333A] focus:outline-none focus:ring-2 focus:ring-red-950" />
      </div>
    </div>
  );
};

export default Header;
