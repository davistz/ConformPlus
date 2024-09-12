import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import Botao from "./Botao";

const ConformidadeItem = ({
  conformidade,
  btn_status,
  color,
  alterarStatusConformidade,
}) => {
  const getStatusClasses = () => {
    if (conformidade.status === "aberto") {
      return "bg-[#dbdbdb] text-[#202224]";
    }
    if (conformidade.status === "andamento") {
      return "bg-[#f5d872] text-[#202224]";
    }
    if (conformidade.status === "concluida") {
      return "bg-[#27aeb564] text-[#202224]";
    }
  };

  return (
    <div>
      <li
        className={`${getStatusClasses()}  flex w-[1440px] h-[60px] items-center ml-[27px] rounded-[10px] mb-4`}
      >
        <label
          className={`transition relative ml-[25px] bg-opacity-100 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg opacity-80 ${color}`}
        >
          <input
            type="checkbox"
            className="absolute cursor-pointer opacity-0"
            onChange={() => alterarStatusConformidade(conformidade.id)}
          />
          {conformidade.status == "concluida" && (
            <FaCheck className="text-white w-5 h-5" />
          )}
          {conformidade.status == "andamento" && (
            <LuLoader2 className="text-white animate-spin w-5 h-5" />
          )}
        </label>
        <div className="w-full items-center flex">
          <ul className="grid grid-cols-[100px_auto_auto_auto_auto] w-full ml-[55px] text-base font-normal list-none">
            <li className="mr-[150px]">{conformidade.id}</li>
            <li className="mr-[130px]">{conformidade.departament}</li>
            <li className="mr-[130px]">{conformidade.departament_destino}</li>
            <li className="mr-[130px]">{conformidade.data}</li>
            <li>{conformidade.grau_severidade}</li>
          </ul>
          <div className="flex items-center">
            <Botao className={`ml-8 ${color}`} select="conformidade">
              {btn_status}
            </Botao>
            <a href="#">
              <FaTrashAlt className="text-[#ff4848] hover:text-[#ff0000] h-[20px] w-[20px] mr-2 ml-3 transition-all duration-300" />
            </a>
            <a href="#">
              <CiCircleInfo className="h-[35px] w-[35px] mr-3 text-[#6c6c6c] hover:text-[#000000] transition-all duration-300" />
            </a>
          </div>
        </div>
      </li>
    </div>
  );
};

ConformidadeItem.propTypes = {
  conformidade: PropTypes.object.isRequired,
  btn_status: PropTypes.string,
  color: PropTypes.string,
  alterarStatusConformidade: PropTypes.func,
};

export default ConformidadeItem;
