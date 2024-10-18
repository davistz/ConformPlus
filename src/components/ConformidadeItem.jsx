import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";

const ConformidadeItem = ({
  conformidade,
  alterarStatusConformidade,
  deletarNaoConformidade,
  onInfoClick,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const canChangeConformidades =
    user?.permission === "Admin" || user?.permission === "Gestor";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth >= 1366);
    };

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getStatusClasses = () => {
    if (conformidade.status === "aberto") {
      return "bg-[#c0c0c0] text-[#202224]";
    }
    if (conformidade.status === "andamento") {
      return "bg-[#f5d872] text-[#202224]";
    }
    if (conformidade.status === "concluida") {
      return "bg-[#27aeb564] text-[#202224]";
    }
  };
  const getColor = () => {
    if (conformidade.status === "aberto") {
      return "bg-[#afaeae] text-[#202224]";
    }
    if (conformidade.status === "andamento") {
      return "bg-[#e5a54c] text-[#202224]";
    }
    if (conformidade.status === "concluida") {
      return "bg-[#27aeb564] text-[#202224]";
    }
  };

  return (
    <div>
      <li
        className={`${getStatusClasses()} flex w-[1400px] max-xl:w-[1200px] md:w-[580px] lg:w-[590px] xl:w-[1420px] 2xl:w-[1420px] max-md:w-[768px] max-sm:w-[500px] h-[60px] items-center ml-[27px] rounded-[10px] mb-4`}
      >
        <label
          className={`transition relative lg:mr-[65px] xl:mr-14 ml-[25px] md:w-10 bg-opacity-100 flex h-9 w-12 lg:w-10 max-sm:w-9 cursor-pointer items-center justify-center rounded-lg opacity-80 ${getColor()}`}
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

        <div className="w-full flex items-center max-sm:w-[100px]">
          <div className="flex items-center w-full">
            <ul
              className={`${
                isSmallScreen
                  ? "grid lg:grid-cols-[200px_210px_0px] xl:grid-cols-[150px_270px_300px_280px_55px] md:grid-cols-[140px_150px_90px] xl:ml-0 items-center"
                  : "grid grid-cols-[100px_240px_150px_260px_100px]  lg:grid-cols-[30px_240px_150px_260px_100px] w-full ml-[55px]"
              } text-base font-normal list-none`}
            >
              {isSmallScreen && <li>{conformidade.id}</li>}{" "}
              <li>{conformidade.origem}</li>
              <li>{conformidade.enquadramento}</li>
              {isSmallScreen && <li>{conformidade.data}</li>}{" "}
              <li>{conformidade.grau_severidade}</li>
            </ul>

            {canChangeConformidades && (
              <div className="ml-[160px] lg:mr-[10px] lg:ml-[150px] md:ml-0 max-sm:ml-[30px] flex items-center">
                <button
                  className=""
                  onClick={() => deletarNaoConformidade(conformidade.id)}
                >
                  <FaTrashAlt className="text-[#ff4848] hover:text-[#ff0000] h-[20px] w-[20px] mr-2 ml-3 transition-all duration-300" />
                </button>
                <button className="">
                  <CiCircleInfo
                    onClick={() => onInfoClick(conformidade)}
                    className="h-[35px] w-[35px] text-[#6c6c6c] hover:text-[#000000] transition-all duration-300"
                  />
                </button>
              </div>
            )}
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
  onInfoClick: PropTypes.func,
};

export default ConformidadeItem;
