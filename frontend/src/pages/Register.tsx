import { useState, FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import Spinner from "../components/Spinner";
import { User } from "../types/User";
import SHOPPING_IMAGE from "../assets/img/shopping.svg";
import LOGO from "../assets/img/logo.svg";
import { userStore } from "../store/user/UserStore";
import { AppDispatch } from "../store";
import { reset } from "../store/user/authSlice";

function Register() {
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success("Register Successfull");
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let formErrors: boolean = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Invalid e-mail");
    }

    if (password.length < 5 || password.length > 20) {
      formErrors = true;
      toast.error("The password must be between 6 and 50 characters long");
    }

    if (formErrors) return;

    const data: User.Add = {
      username,
      email,
      password,
    };
    
    dispatch(userStore.register(data));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          <div className="absolute top-[20%] left-[10%] flex flex-col">
            <h1 className="text-4xl text-[#F9A109] font-bold my-4">
              Turn Your Ideas into reality
            </h1>
            <p className="text-xl text-[#3F3D56] font-normal">
              Start for free and get attrative offers from the community
            </p>
          </div>
          <img src={SHOPPING_IMAGE} className="w-full h-full object-contain" />
        </div>

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
          <h1 className="flex text-xl text-[#060606] font-semibold">
            <img src={LOGO} className="w-9 h-9 p-1" />
            ShoppingFy
          </h1>

          <div className="w-full flex flex-col max-w-[400px]">
            <div className="flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2">Register</h3>
              <p className="text-base mb-2">
                Welcome Back! Please enter your details.
              </p>
            </div>

            <div className="w-full flex flex-col">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-[#F9A109] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-[#F9A109] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-[#F9A109] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <div className="w-full flex flex-col mt-4">
                  <button
                    type="submit"
                    className="w-full text-white my-2 font-semibold bg-[#F9A109] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full flex items-center justify-center relative py-2 mt-2">
              <div className="w-64 h-[1px] bg-black"></div>
              <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
            </div>

            <div className="w-full text-balck my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
              <Link to="/">
                <FcGoogle className="h-6 w-6 mr-2" />
              </Link>
              Google
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#060606]">
              Already have a account?{" "}
              <Link to="/login">
                <span className="font-semibold underline underline-offset-2 hover:text-[#F9A109] cursor-pointer">
                  Login
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
