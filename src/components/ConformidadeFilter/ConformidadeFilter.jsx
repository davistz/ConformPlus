import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import * as s from "./ConformidadeFilter.styled";
import { useTheme } from "../../ThemeContext";
import userImg from "../../img/img_users/lucas.png";

const ConformidadeFilter = ({
  conformidade,
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

  return (
    <div>
      <s.StyledLi className={getStatusClasses()}>
        <s.StyledDiv>
          <s.StyledUl>
            {!isSmallScreen && <li>{conformidade.id}</li>}
            {!isSmallScreen ? <li>•</li> : <li></li>}
            <li>{conformidade.titulo}</li>
            <li>•</li>
            <li>{conformidade.origem}</li>
            {!isSmallScreen ? <li>•</li> : <li>•</li>}
            <li>{conformidade.departamento}</li>
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
            {!isSmallScreen && <li>{conformidade.grau_severidade}</li>}
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

ConformidadeFilter.propTypes = {
  conformidade: PropTypes.object.isRequired,
  alterarStatusConformidade: PropTypes.func,
  deletarNaoConformidade: PropTypes.func,
  onInfoClick: PropTypes.func,
};

export default ConformidadeFilter;
