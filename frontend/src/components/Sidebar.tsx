import LOGO from "../assets/img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdFormatListBulleted } from "react-icons/md";
import { MdInsertChartOutlined } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { userStore } from "../store/user/UserStore";
import { reset } from "../store/user/authSlice";
import { AppDispatch } from "../store";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(userStore.logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <>
      <div className="w-13 bg-white fixed h-full px-1 py-2  flex flex-col items-center justify-between">
        <div>
          <img src={LOGO} className="w-9 h-9 p-1" />
        </div>
        <ul className="mt-3">
          <li className="mb-2 rounded hover:shadow hover:bg-[#F9A109] py-2">
            <Link to="/items" className="px-3">
              <MdFormatListBulleted className="inline-block w-6 h-6 mr-2 -mt-2 fill-[#454545]" />
            </Link>
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-[#F9A109] py-2">
            <Link to="/" className="px-3">
              <MdHistory className="inline-block w-6 h-6 mr-2 -mt-2 fill-[#454545]" />
            </Link>
          </li>
          <li className="mb-2 rounded hover:shadow hover:bg-[#F9A109] py-2">
            <Link to="statistic" className="px-3">
              <MdInsertChartOutlined className="inline-block w-6 h-6 mr-2 -mt-2 fill-[#454545]" />
            </Link>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-[#F9A109] py-2">
            <Link to="/account" className="px-3">
              <MdOutlineAccountCircle className="inline-block w-6 h-6 mr-2 -mt-2 fill-[#454545]" />
            </Link>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-[#F9A109] py-2">
            <button  className="px-3" onClick={handleLogout}>
              <CiLogout className="inline-block w-6 h-6 mr-2 -mt-2 fill-[#454545]" />
            </button>
          </li>
        </ul>
        <div className="rounded-[100%] hover:shadow py-2 px-3 bg-[#F9A109] relative">
          <span className="flex items-center justify-center rounded bg-[#EB5757] absolute right-2 -top-4 left-1 ml-2">
            20
          </span>
          <Link to="">
            <AiOutlineShoppingCart className="w-6 h-6 fill-[#454545]" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
