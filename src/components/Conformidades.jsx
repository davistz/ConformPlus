import PropTypes from "prop-types";
import { IoMdAdd } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Id from "./Id";

const Conformidades = ({ title }) => {
  return (
    <div className="w-full h-full rounded-[10px] bg-red-400">
      <div className="flex items-center justify-between">
        <h1 className="py-[20px] pl-[20px] text-2xl font-bold ">{title}</h1>
        <div className="flex items-center gap-5 pr-[30px]">
          <IoMdAdd className="w-7 h-7" />
          <GiHamburgerMenu className="w-5 h-5" />
        </div>
      </div>
      <div>
        <Id />
      </div>
    </div>
  );
};

Conformidades.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Conformidades;
