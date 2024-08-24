import { useState, FormEvent, useEffect } from "react";
import Creatable from "react-select/creatable";
import { Category } from "../types/Category";
import { toast } from "react-toastify";
import isEmpty from "validator/lib/isEmail";
import { itemService } from "../service/item/ItemService";
import { categoryService } from "../service/category/CategoryService";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const AddNewItem = ({ onBackClick }: any) => {
  const navigate = useNavigate();
  const [, setSelectedOption] = useState(null);
  const [categories, setCategories] = useState<Category.Entity[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    note: "",
    categoryName: "",
    image: "",
  });

  const handleSelectChange = (option: any) => {
    setSelectedOption(option);
    setFormData((prevData) => ({
      ...prevData,
      categoryName: option ? option.value : "",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAllCategories();
        const mappedCategories: any = response.map((category) => ({
          value: category.name,
          label: category.name,
        }));
        setCategories(mappedCategories);
      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateForm = (): boolean => {
    if (
      isEmpty(formData.name) ||
      isEmpty(formData.note) ||
      isEmpty(formData.categoryName)
    ) {
      toast.error("Please, fill in all the fields");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      itemService.createItem(formData);
      toast.success("Item added.");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add item");
      return;
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="bg-[#f1f1f5] w-[25%] h-full py-0 px-5 fixed right-0">
        <h2 className="text-[1.2rem] font-medium mb-8 mt-8 text-black">
          Add a new item
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col relative w-full h-full pb-14"
        >
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[14px] font-medium text-[#34333A] mb-1 inline-block leading-[17px]">
              Name
            </label>
            <input
              placeholder="Enter a name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="text-[14px] font-medium text-[#BDBDBD] rounded-[12px] border-[2px] border-solid boder-[#BDBDBD] py-[1rem] pl-[0.5rem] outline-[#F9A109]"
            />
          </div>
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[14px] font-medium text-[#34333A] mb-1 inline-block leading-[17px]">
              Note (optional)
            </label>
            <textarea
              placeholder="Enter a note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="rounded-[12px] border-[2px] border-solid boder-[#BDBDBD] py-[1rem] pl-[0.5rem] outline-[#F9A109] resize-none"
            />
          </div>
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[14px] font-medium text-[#34333A] mb-1 inline-block leading-[17px]">
              Image (optional)
            </label>
            <input
              placeholder="Enter a url"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="text-[14px] font-medium text-[#BDBDBD] rounded-[12px] border-[2px] border-solid boder-[#BDBDBD] py-[1rem] pl-[0.5rem] outline-[#F9A109]"
            />
          </div>
          <div className="flex flex-col flex-nowrap mb-4">
            <label className="text-[14px] font-medium text-[#34333A] mb-1 inline-block leading-[17px]">
              Category
            </label>
            <Creatable
              options={categories!}
              onChange={handleSelectChange}
              isClearable
            />
          </div>
          <div className="flex items-center justify-center gap-10 mt-5">
            <button
              onClick={onBackClick}
              className="text-[16px] font-bold leading-[20px] text-[#34333A]"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-[#F9A109] text-white text-[16px] font-bold rounded-[12px] py-3 px-3 leading-[20px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewItem;
