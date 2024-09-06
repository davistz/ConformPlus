import { IoIosSearch } from "react-icons/io";

const BarraPesquisa = () => {
  return (
    <div className="relative ml-[45px]">
      <IoIosSearch className="absolute ml-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Pesquisar"
        className="pl-10 w-[530px] bg-[#E3E2E2] h-[45px] border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default BarraPesquisa;
