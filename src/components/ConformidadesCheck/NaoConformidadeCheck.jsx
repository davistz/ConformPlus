import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import * as s from "./NaoConformidadeCheck.styled";
import { useTheme } from "../../ThemeContext";
import userImg from "../../img/img_users/lucas.png";
import { useNotification } from "../../NotificationContext";

const NaoConformidadeCheck = ({
  isOpen,
  handleClose,
  conformidadesPendentes,
  alterarStatusConformidade,
  deletarNaoConformidade,
}) => {
  if (!isOpen) return null;

  const { isDarkMode } = useTheme();
  const { addNotification } = useNotification();

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

        {s.EmptyMessage && conformidadesPendentes.length === 0 && (
          <s.EmptyMessage isDarkMode={isDarkMode}>
            Não possui conformidades pendentes!
          </s.EmptyMessage>
        )}

        {conformidadesPendentes.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <s.CardsContainer>
              {conformidadesPendentes.map((conformidade, index) => (
                <s.Card key={index} isDarkMode={isDarkMode}>
                  <s.CardContent>
                    <div className="flex justify-between">
                      <p>
                        <strong>Titulo: </strong>
                        {conformidade.titulo}
                      </p>
                    </div>
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
                    <p className="font-semibold">Responsável:</p>
                    <div className="flex items-center gap-1">
                      <img className="w-8 rounded-full" src={userImg} alt="" />
                      <p className="text-sm ">Davi Souza</p>
                    </div>
                  </s.CardContent>
                  <s.CardActions>
                    <s.ActionButton
                      onClick={() => deletarNaoConformidade(conformidade.id)}
                    >
                      Recusar
                    </s.ActionButton>
                    <s.ActionButton
                      onClick={() => {
                        addNotification(
                          `Nova não conformidade autorizada por Davi Souza!`,
                          "success"
                        );

                        alterarStatusConformidade(conformidade.id);
                      }}
                    >
                      Aceitar
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
