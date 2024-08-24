import { useState, FormEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import Spinner from "../components/Spinner";
import { User } from "../types/User";
import { userStore } from "../store/user/UserStore";
import { userService } from "../service/user/UserService";
import { AppDispatch } from "../store";
import { reset } from "../store/user/authSlice";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState<User.Entity | null>(null);
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userService.user();
        setUserInfo(response);
        setFormData({
          username: response.username || "",
          email: response.email || "",
          password: "",
        });
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Profile Updated Successfully");
      navigate("/account");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!isEmail(formData.email)) {
      toast.error("Invalid e-mail");
      return false;
    }

    if (
      formData.password &&
      (formData.password.length < 6 || formData.password.length > 50)
    ) {
      toast.error("The password must be between 6 and 50 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const updateData: Partial<User.Entity> = {
      id: userInfo?.id,
      username: formData.username,
      email: formData.email,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    dispatch(userStore.edit(updateData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="bg-[#f1f1f5] w-[100%] h-screen flex flex-col items-center pl-16">
        <div className="flex flex-col mt-auto mb-auto">
          <span className="text-[#F9A109] font-bold text-[18px]">
            Change Info
          </span>
          <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                placeholder="Username"
                onChange={handleInputChange}
                className="w-full text-[#454545] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleInputChange}
                className="w-full text-[#454545] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-medium"
              />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                placeholder="New Password"
                onChange={handleInputChange}
                className="w-full text-[#454545] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-medium"
              />
              <div className="w-full flex flex-col mt-4">
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-[#F9A109] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
