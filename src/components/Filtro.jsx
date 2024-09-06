import { FaFilter } from "react-icons/fa6";

const Filter = () => {
  return (
    <div className="relative w-[133px]">
      {/* Ícone customizado sobre o select */}
      <select
        className="appearance-none w-full h-[45px] bg-[#E3E2E2] pl-[13px] pr-[40px] border-solid border border-[#666666] rounded-2xl text-sm font-bold cursor-pointer"
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
      <FaFilter className="absolute ml-[95px] top-3 mt-1 text-[#666666] pointer-events-none" />
    </div>
  );
};

export default Filter;
