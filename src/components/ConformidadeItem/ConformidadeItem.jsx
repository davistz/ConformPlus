import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import * as s from "./ConformidadeItem.styled";
import { useTheme } from "../../ThemeContext";
import userImg from "../../img/img_users/lucas.png";

const ConformidadeItem = ({
  conformidade,
  alterarStatusConformidade,
  deletarNaoConformidade,
  onInfoClick,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isDarkMode } = useTheme();

  const [personState, setPersonState] = useState(null);

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");

    if (storedPerson) {
      setPersonState(JSON.parse(storedPerson));
    }
  }, []);

  const canChangeConformidades =
    personState?.permission === "Admin" || personState?.permission === "Gestor";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(1024 >= window.innerWidth);
    };

    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getStatusClasses = () => {
    if (conformidade.status === "aberto") {
      return isDarkMode
        ? "bg-[#707070] text-[#e2e2e2]"
        : "bg-[#c0c0c0] text-[#202224]";
    }
    if (conformidade.status === "andamento") {
      return isDarkMode
        ? "bg-[#906c00] text-[#e2e2e2]"
        : "bg-[#edc533] text-[#202224]";
    }
    s;
    if (conformidade.status === "concluida") {
      return isDarkMode
        ? "bg-[#0c5256] text-[#e2e2e2]"
        : "bg-[#26d2db64] text-[#202224]";
    }
  };

  const getColor = () => {
    if (conformidade.status === "aberto") {
      return isDarkMode
        ? "background-color: #afaeae; color: #c0c0c0;"
        : "background-color: #afaeae; color: #202224;";
    }
    if (conformidade.status === "andamento") {
      return isDarkMode
        ? "background-color: #c78d3d; color: #fff;"
        : "background-color: #ffb752; color: #202224;";
    }
    if (conformidade.status === "concluida") {
      return isDarkMode
        ? "background-color: #15b0b862; color: #fff;"
        : "background-color: #27aeb564; color: #202224;";
    }
  };

  return (
    <div>
      <s.StyledLi className={getStatusClasses()}>
        <s.StyledLabel getColor={getColor}>
          <s.StyledInput
            type="checkbox"
            onChange={() => alterarStatusConformidade(conformidade.id)}
          />
          {conformidade.status === "concluida" && (
            <FaCheck className="text-white w-5 h-5" />
          )}
          {conformidade.status === "andamento" && (
            <LuLoader2 className="text-white animate-spin w-5 h-5" />
          )}
        </s.StyledLabel>

        <s.StyledDiv>
          <s.StyledUl>
            <li>{conformidade.titulo}</li>
            {!isSmallScreen ? <li>•</li> : <li></li>}
            {!isSmallScreen && <li>{conformidade.origem}</li>}
            {!isSmallScreen ? <li>•</li> : <li></li>}
            {!isSmallScreen && (
              <li className="flex items-center ">
                <img
                  src={userImg}
                  alt="User Icon"
                  className="w-[40px] mr-[10px] rounded-full"
                />
                {conformidade.createdBy}
              </li>
            )}
            {!isSmallScreen ? <li>•</li> : <li></li>}
            <li>{conformidade.grau_severidade}</li>
            {!isSmallScreen ? <li>•</li> : <li></li>}
            {!isSmallScreen && <li>{conformidade.data}</li>}
            {!isSmallScreen ? <li>•</li> : <li></li>}
            {!isSmallScreen && <li>{conformidade.prazo}</li>}
          </s.StyledUl>

          {canChangeConformidades && (
            <s.ActionButtonWrapper>
              <s.ActionButton
                onClick={() => deletarNaoConformidade(conformidade.id)}
              >
                <FaTrashAlt className="text-[#ff4848] max-sm:h-4 max-sm:mt-1 max-sm:w-4 h-[20px] w-[20px]" />
              </s.ActionButton>
              <s.ActionButton onClick={() => onInfoClick(conformidade)}>
                <CiCircleInfo
                  className={`h-[35px] w-[35px] max-sm:mt-1 max-sm:h-6 max-sm:w-6  ${
                    isDarkMode ? "text-[#e2e2e2]" : "text-[#6c6c6c]"
                  }`}
                />
              </s.ActionButton>
            </s.ActionButtonWrapper>
          )}
        </s.StyledDiv>
      </s.StyledLi>
    </div>
  );
};

ConformidadeItem.propTypes = {
  conformidade: PropTypes.object.isRequired,
  alterarStatusConformidade: PropTypes.func,
  deletarNaoConformidade: PropTypes.func,
  onInfoClick: PropTypes.func,
};

export default ConformidadeItem;
