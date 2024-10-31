import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import { CiCircleInfo } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import * as s from "./ConformidadeItem.styled";

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
      setIsSmallScreen(1024 >= window.innerWidth);
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
            {!isSmallScreen && <li>{conformidade.id}</li>}
            <li>{conformidade.origem}</li>
            <li>{conformidade.enquadramento}</li>
            {!isSmallScreen && <li>{conformidade.data}</li>}
            <li>{conformidade.grau_severidade}</li>
          </s.StyledUl>

          {canChangeConformidades && (
            <s.ActionButtonWrapper>
              <s.ActionButton
                onClick={() => deletarNaoConformidade(conformidade.id)}
              >
                <FaTrashAlt className="text-[#ff4848] h-[20px] w-[20px]" />
              </s.ActionButton>
              <s.ActionButton onClick={() => onInfoClick(conformidade)}>
                <CiCircleInfo className="h-[35px] w-[35px] text-[#6c6c6c]" />
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
  color: PropTypes.string,
  alterarStatusConformidade: PropTypes.func,
  deletarNaoConformidade: PropTypes.func,
  onInfoClick: PropTypes.func,
};

export default ConformidadeItem;
