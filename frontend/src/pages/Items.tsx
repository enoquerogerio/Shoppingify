import { useState, useEffect } from "react";
import Cart from "../components/Cart";
import Header from "../components/Header";
import Item from "../components/Item";
import { Item as EntityItem } from "../types/Item";
import ItemInfo from "../components/ItemInfo";
import { ItemDetails } from "../types/Item";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { itemService } from "../service/item/ItemService";

const Items = () => {
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);
  const [items, setItems] = useState<EntityItem.Entity[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleItemClick = (item: ItemDetails) => {
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await itemService.getAllItems();
        setItems(response.items);

        console.log(response);
      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const groupedItems = items.reduce(
    (acc: Record<string, EntityItem.Entity[]>, item) => {
      if (!acc[item.categoryName!]) {
        acc[item.categoryName!] = [];
      }
      acc[item.categoryName!].push(item);
      return acc;
    },
    {}
  );

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="bg-[#f1f1f5] w-[75%] min-h-screen flex flex-col items-center justify-center pl-16 pb-3">
        <Header />
        {Object.keys(groupedItems).length > 0 ? (
          Object.keys(groupedItems).map((category) => (
            <div key={category}>
              <h2 className="text-black mb-4 mt-5 text-[18px] font-medium">
                {category}
              </h2>
              <div className="grid grid-rows-2 grid-cols-4 gap-4">
                {groupedItems[category].map((item) => (
                  <Item
                    key={item.id}
                    itemDetails={item}
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="mt-52 font-extrabold">No items available.</p>
        )}
      </section>
      {selectedItem ? (
        <ItemInfo onBackClick={handleBackClick} item={selectedItem} />
      ) : (
        <Cart />
      )}
    </>
  );
};

export default Items;
