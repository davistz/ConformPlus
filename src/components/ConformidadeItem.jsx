import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";

const ConformidadeItem = ({
  conformidade,
  color,
  alterarStatusConformidade,
  deletarNaoConformidade,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Função para verificar o tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // 640px é o limite para "sm" no Tailwind
    };

    // Verificar quando a tela é redimensionada
    window.addEventListener("resize", checkScreenSize);

    // Verificação inicial
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
        className={`${getStatusClasses()} flex w-[1400px] h-[60px] max-sm:w-[500px] items-center ml-[27px] rounded-[10px] mb-4`}
      >
        <label
          className={`transition relative ml-[25px] bg-opacity-100 flex h-9 w-12 max-sm:w-9 cursor-pointer items-center justify-center rounded-lg opacity-80 ${color}`}
        >
          <input
            type="checkbox"
            className="absolute cursor-pointer opacity-0"
            onChange={() => alterarStatusConformidade(conformidade.id)}
          />
          {conformidade.status === "concluida" && (
            <FaCheck className="text-white w-5 h-5" />
          )}
          {conformidade.status === "andamento" && (
            <LuLoader2 className="text-white animate-spin w-5 h-5" />
          )}
        </label>
        <div className="w-screen max-sm:w-[100px] items-center flex">
          {/* Renderiza os itens de acordo com o tamanho da tela */}
          <div className="items-center justify-end flex">
            <ul
              className={`${
                isSmallScreen
                  ? "ml-[30px] grid grid-cols-[120px_130px_100px]"
                  : "grid grid-cols-[100px_240px_150px_260px_100px] gap-x-8 w-full ml-[55px]"
              } text-base font-normal mr-10 list-none`}
            >
              {!isSmallScreen && <li>{conformidade.id}</li>}
              <li>{conformidade.departamento}</li>
              <li>{conformidade.departamento_destino}</li>
              {!isSmallScreen && <li>{conformidade.data}</li>}
              <li>{conformidade.grau_severidade}</li>
            </ul>
            <div className="max-sm:absolute ml-[160px] flex items-center">
              <button
                className=""
                onClick={() => deletarNaoConformidade(conformidade.id)}
              >
                <FaTrashAlt className="text-[#ff4848] hover:text-[#ff0000] h-[20px] w-[20px] mr-2 ml-3 transition-all duration-300" />
              </button>
              <button className="">
                <CiCircleInfo className="h-[35px] w-[35px] text-[#6c6c6c] hover:text-[#000000] transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

ConformidadeItem.propTypes = {
  conformidade: PropTypes.object.isRequired,
  color: PropTypes.string,
  alterarStatusConformidade: PropTypes.func,
  deletarNaoConformidade: PropTypes.func,
};

export default ConformidadeItem;
