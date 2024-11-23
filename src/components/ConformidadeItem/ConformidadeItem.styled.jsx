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
    max-width: 400px;
    margin-left: 0px;
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
  gap: 10px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
`;
export const SearchContainer = styled.div`
  margin: 16px 0;
  input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#444" : "#ccc")};
    background-color: ${({ isDarkMode }) => (isDarkMode ? "#222" : "#fff")};
    color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
    font-size: 16px;
  }
`;

export const StyledUl = styled.ul`
  display: grid;
  font-size: 1rem;
  font-weight: normal;
  list-style: none;
  margin-left: 44px;

  /* Layout para telas menores que 640px */
  @media (max-width: 640px) {
    grid-template-columns: 0 125px 0px 10px 10px 0px;

    font-size: 11px;
    margin-left: -10px;
  }

  /* Layout para telas menores que 1024px */

  /* Layout para telas maiores que 1280px */
  @media (min-width: 1280px) {
    grid-template-columns: 80px 55px 190px 60px 240px 50px 240px 80px auto;
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;

  @media (max-width: 640px) {
    margin-top: -35px;
  }
`;

export const ActionButton = styled.button`
  margin: 0 5px;
  transition: all 0.3s ease;
  &:hover {
    color: #ff0000;
  }
`;
