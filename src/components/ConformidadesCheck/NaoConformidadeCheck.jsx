import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import * as s from "./NaoConformidadeCheck.styled";
import { useTheme } from "../../ThemeContext";

const NaoConformidadeCheck = ({
  isOpen,
  handleClose,
  conformidadesPendentes,
  alterarStatusConformidade,
  deletarNaoConformidade,
}) => {
  if (!isOpen) return null;

  const { isDarkMode } = useTheme();

  return (
    <s.Overlay>
      <s.ModalContainer isDarkMode={isDarkMode}>
        <s.CloseButton onClick={handleClose} />
        <s.TitleContainer>
          <s.Title isDarkMode={isDarkMode}>Não Conformidades Pendentes</s.Title>
          <s.Subtitle isDarkMode={isDarkMode}>
            Autorize as Não Conformidades Abaixo
          </s.Subtitle>
        </s.TitleContainer>

        {conformidadesPendentes.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <s.CardsContainer>
              {conformidadesPendentes.map((conformidade, index) => (
                <s.Card key={index} isDarkMode={isDarkMode}>
                  <s.CardContent>
                    <p>
                      <strong>Id:</strong> {conformidade.id}
                    </p>
                    <p>
                      <strong>Origem:</strong> {conformidade.origem}
                    </p>
                    <p>
                      <strong>Enquadramento:</strong>{" "}
                      {conformidade.enquadramento}
                    </p>
                    <p>
                      <strong>Grau de Severidade:</strong>{" "}
                      {conformidade.grau_severidade}
                    </p>
                  </s.CardContent>
                  <s.CardActions>
                    <s.ActionButton
                      onClick={() => alterarStatusConformidade(conformidade.id)}
                    >
                      <FaCheck />
                    </s.ActionButton>
                    <s.ActionButton
                      onClick={() => deletarNaoConformidade(conformidade.id)}
                    >
                      <FaTrashAlt />
                    </s.ActionButton>
                  </s.CardActions>
                </s.Card>
              ))}
            </s.CardsContainer>
          </div>
        )}
      </s.ModalContainer>
    </s.Overlay>
  );
};

NaoConformidadeCheck.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  conformidadesPendentes: PropTypes.array.isRequired,
  alterarStatusConformidade: PropTypes.func.isRequired,
  deletarNaoConformidade: PropTypes.func.isRequired,
};

export default NaoConformidadeCheck;
