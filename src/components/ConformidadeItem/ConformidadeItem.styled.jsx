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
  align-items: center;
  list-style: none;
  margin-left: 10px;
  @media (max-width: 640px) {
    grid-template-columns: 0 115px 10px 10px 10px 0px;

    font-size: 13px;
    margin-left: -10px;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 140px 30px 150px 30px 180px 100px 140px 40px 180px 30px 150px;
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
