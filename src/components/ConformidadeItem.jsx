import PropTypes from "prop-types";
import Checkbox from "./Checkbox";

const ConformidadeItem = ({ conformidade }) => {
  const getStatusClasses = () => {
    if (conformidade.status == "aberto") {
      return "bg-[#dbdbdb] text-[#202224]";
    }
    if (conformidade.status == "andamento") {
      return "bg-[#FFAA04] text-[#202224]";
    }
    if (conformidade.status == "concluida") {
      return "bg-[#00969eae] text-[#202224]";
    }
  };

  return (
    <div
      className={`${getStatusClasses()} flex w-[1440px] mt-2 ml-[27px] py-5 rounded-[10px]`}
    >
      <div className="flex ml-[30px] ">
        <Checkbox />
        <div className="flex ml-[75px] text-xl font-medium gap-[210px]">
          <p>{conformidade.id}</p>
          <p>{conformidade.title}</p>
          <p>{conformidade.departament}</p>
          <p>{conformidade.departament_destino}</p>
          <p>{conformidade.grau_severidade}</p>
        </div>
      </div>
    </div>
  );
};

ConformidadeItem.propTypes = {
  conformidade: PropTypes.node.isRequired,
};

export default ConformidadeItem;
