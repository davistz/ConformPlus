import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";

const BarraPesquisa = ({ className }) => {
  return (
    <div className="relative ml-[45px]">
      <IoIosSearch className="absolute ml-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Pesquisar"
        className={`${className} pl-10 w-[530px] bg-[#E3E2E2] h-[45px] border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
};

BarraPesquisa.propTypes = {
  className: PropTypes.node,
};

export default BarraPesquisa;
