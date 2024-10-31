import styled from "styled-components";

export const StyledLi = styled.li`
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: 60px;
  align-items: center;
  margin-left: 27px;
  border-radius: 10px;
  margin-bottom: 4px;

  @media (max-width: 640px) {
    max-width: 580px;
    margin-left: 10px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1200px;
  }

  @media (min-width: 1280px) {
    max-width: 1420px;
  }

  @media (min-width: 1536px) {
    max-width: 1420px;
  }
`;

export const StyledLabel = styled.label`
  transition: all 0.3s ease;
  margin-left: 25px;
  margin-right: 15px; /* Ajuste a margem para ser mais responsivo */
  width: 10px; /* Ajuste baseado na lógica de responsividade */
  background-color: rgba(255, 255, 255, 0.8);
  height: 30px; /* Ajuste para dar mais espaço ao botão */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  opacity: 0.8;

  ${(props) =>
    props.getColor && props.getColor()}; /* Chamando a função getColor */
`;

export const StyledInput = styled.input`
  position: absolute;
  cursor: pointer;
  opacity: 0;
`;

export const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column; /* Mude para coluna em telas menores */
    align-items: flex-start; /* Alinhe à esquerda */
    margin-left: 10px; /* Ajuste de margem */
  }
`;

export const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 1rem; /* text-base */
  font-weight: normal;
  list-style: none;
  margin-left: 55px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    margin-left: 0;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; /* Use 'auto' para empurrar para a direita */
  margin-right: 10px; /* Margem à direita para espaçamento */

  @media (max-width: 640px) {
    margin-left: 0; /* Remove margem esquerda em telas pequenas */
    margin-top: 10px; /* Adiciona espaço acima */
  }
`;

export const ActionButton = styled.button`
  margin: 0 5px;
  transition: all 0.3s ease;
  &:hover {
    color: #ff0000;
  }
`;
