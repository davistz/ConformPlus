import { FaFilter } from "react-icons/fa6";
import PropTypes from "prop-types";

const Filter = ({ className }) => {
  return (
    <div className="relative w-[133px]">
      {/* Ícone customizado sobre o select */}
      <select
        className={`${className} appearance-none h-[45px] bg-[#E3E2E2] pl-[13px] pr-[40px] border-solid border border-[#666666] rounded-2xl text-sm font-bold cursor-pointer`}
        defaultValue=""
      >
        <option value="" disabled>
          Filtrar
        </option>
        <option value="aberto">Em aberto</option>
        <option value="andamento">Em andamento</option>
        <option value="concluidas">Concluídas</option>
      </select>

      {/* Ícone de seta */}
      <FaFilter className="absolute ml-[95px] lg:ml-[65px] top-3 mt-1 text-[#666666] pointer-events-none" />
    </div>
  );
};

Filter.propTypes = {
  className: PropTypes.node,
};

export default Filter;
