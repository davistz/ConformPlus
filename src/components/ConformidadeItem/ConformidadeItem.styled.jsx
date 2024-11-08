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
    max-width: 1200px;
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
  margin-right: 15px;
  width: 35px;
  background-color: rgba(255, 255, 255, 0.8);
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  opacity: 0.8;

  ${(props) => props.getColor && props.getColor()};
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
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px; /* Ajuste de margem */
  }
`;

export const StyledUl = styled.ul`
  display: grid;
  font-size: 1rem;
  font-weight: normal;
  list-style: none;
  margin-left: 49px;

  @media (max-width: 640px) {
    grid-template-columns: 150px 260px 300px;
    margin-left: 0;
  }

  @media (min-width: 640px) {
    grid-template-columns: 150px 260px 300px 240px 10px;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 90px 170px 150px 250px 60px; /* Ajusta as colunas para telas menores */
  }
  @media (min-width: 1280px) {
    grid-template-columns: 150px 260px 300px 290px 0px; /* Ajusta as colunas para telas menores */
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;

  @media (max-width: 640px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const ActionButton = styled.button`
  margin: 0 5px;
  transition: all 0.3s ease;
  &:hover {
    color: #ff0000;
  }
`;
