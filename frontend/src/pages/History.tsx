import ShoppingHistory from "../components/ShoppingHistory";
import { Shopping } from "../types/Shopping";
import Cart from "../components/Cart";
const data: Shopping = {
  name: "Avocado",
  id: "1",
  status: "cancelled",
  data: "Mon 27.8.2020",
};

const History = () => {
  return (
    <>
      <section className="w-[80%] min-h-screen bg-[#f1f1f5] flex flex-col items-center pl-16 pb-3">
        <h1 className="text-black text-[26px] font-medium mt-5">Shopping history</h1>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="mt-4">
            <h2 className="text-black mb-4 mt-5 text-[18px] font-medium">
              {data.data}
            </h2>
            <div className="flex flex-col items-center gap-4 ">
              <ShoppingHistory ShoppingDetails={data} />
            </div>
          </div>
        ))}
      </section>
      <Cart />
    </>
  );
};

export default History;
