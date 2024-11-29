import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 829px;
  margin-top: 1rem;
  margin-left: 20rem;
  width: 80%;

  @media (max-width: 640px) {
    height: auto;
    margin-left: 0rem;
    width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;

  margin-top: 130px;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 90%;
    margin-left: -10px;
    align-items: center;
  }
`;
export const DivSelector = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 50px;
  margin-left: 60px;

  h1 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-right: 10px;
    color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
  }

  select {
    width: 140px;
    height: 40px;
    font-size: 1rem;
    border: 1px solid ${({ isDarkMode }) => (isDarkMode ? "#666" : "#ccc")};
    border-radius: 5px;
    outline: none;
    background-color: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#fff")};
    color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
    cursor: pointer;

    option {
      background-color: ${({ isDarkMode }) => (isDarkMode ? "#444" : "#fff")};
      color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
    }
  }
  @media (max-width: 640px) {
  }
`;

export const DividerMain = styled.div`
  border-bottom: 1px solid
    ${(props) => (props.isDarkMode ? "#4b5563" : "#d1d5db")};
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-left: -3rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  width: 100%;
  justify-content: flex-end;
  margin-left: -10px;
  margin-right: 10px;

  @media (max-width: 640px) {
    flex-direction: column;
    justify-content: center;
    width: 90%;
    margin-left: 40px;
    gap: 12px;
  }
`;

export const BtnAdd = styled.button`
  background-color: #164095;
  /* width: 260px; */
  width: ${({ canViewConformidadesPendente }) =>
    canViewConformidadesPendente ? "300px" : "100%"};
  height: ${({ canViewConformidadesPendente }) =>
    canViewConformidadesPendente ? "42px" : "100px"};
  font-size: ${({ canViewConformidadesPendente }) =>
    canViewConformidadesPendente ? "0.875rem" : "1.575rem"};
  font-weight: ${({ canViewConformidadesPendente }) =>
    canViewConformidadesPendente ? "400" : "700"};

  padding: 0 8px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1b5dbf;
    transform: scale(1.01);
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 45px;
    font-size: 0.575rem;
  }
`;

export const BtnCheck = styled.button`
  background-color: #e49d31;
  width: 220px;
  height: 40px;
  padding: 0 8px;
  font-size: 0.875rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ca8723;
  }

  @media (max-width: 640px) {
    width: 100%;
    height: 45px;
    font-size: 0.6rem;
  }
`;

export const Panel = styled.div`
  padding-left: 50px;
  margin-top: -1rem;

  @media (max-width: 640px) {
    padding-left: 20px;
  }
`;

export const Box = styled.div`
  background-color: ${({ section, isDarkMode }) => {
    switch (section) {
      case "andamento":
        return isDarkMode ? "#967001c1" : "#eac623b8";
      case "aberto":
        return isDarkMode ? "#454545" : "#e1e1e1";
      case "concluido":
        return isDarkMode ? "#073a3d" : "#15b6bf";
      default:
        return "#e1e1e1";
    }
  }};

  color: ${({ isDarkMode }) => (isDarkMode ? "#cecece" : "#000")};
  border-radius: 16px;
  padding: 20px;
  width: 100%;

  @media (min-width: 1280px) {
    width: 1480px;
  }

  @media (max-width: 640px) {
    width: 380px;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 20px;
  padding-left: 20px;
  text-align: left;

  @media (max-width: 640px) {
    font-size: 1.25rem;
    padding: 10px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 30px;

  @media (max-width: 640px) {
    padding-right: 0;
    justify-content: center;
  }
`;

export const StatusHeader = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  font-size: 0.75rem;
  gap: 100px;
  margin-left: 150px;

  @media (max-width: 768px) {
    margin-left: 120px;
    gap: 50px;
  }

  @media (max-width: 640px) {
    margin-left: 35px;
    justify-content: center;
    font-size: 0.65rem;
    gap: 15px;
  }
`;
