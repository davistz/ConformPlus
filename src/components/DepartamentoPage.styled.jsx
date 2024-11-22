import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 130px;
  margin-left: 12px;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
`;

export const Main = styled.main`
  flex: 1;
  padding: 32px;
  width: 1550px;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 640px) {
    font-size: 1.2rem;
    margin-left: -1.5rem;
  }
`;

export const MiniLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    margin: 0;
    font-size: 0.875rem;
  }
  img {
    width: 32px;
    height: auto;
  }
`;

export const Divider = styled.div`
  border-bottom: 1px solid
    ${(props) => (props.isDarkMode ? "#4b5563" : "#d1d5db")};
  margin-bottom: 60px;

  @media (max-width: 768px) {
  }
`;
export const DividerMain = styled.div`
  border-bottom: 1px solid
    ${(props) => (props.isDarkMode ? "#4b5563" : "#d1d5db")};
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-left: -3rem;
    margin-right: -2rem;
  }
`;

export const DepartmentsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
`;

export const DepartmentCard = styled.div`
  padding: 16px;
  width: 100%;
  height: 250px;
  background-color: ${(props) => (props.isDarkMode ? "#2c2c2c" : "#f3f4f6")};
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid transparent;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 370px;
    margin-left: -1rem;
  }
`;

export const DepartmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    display: flex;
    align-items: center;

    svg {
      margin-left: 8px;
    }
  }

  div {
    display: flex;
    gap: 12px; /* Ajustando o espaçamento entre os botões */
    align-items: center;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.status === "active" ? "#10b981" : "#ef4444"};
  color: white;
`;

export const EditButton = styled.button`
  margin-left: auto;
  font-size: 1.125rem;
  margin-left: 22rem;
  font-weight: 600;

  color: ${(props) => (props.isDarkMode ? "#6da6ec" : "#2563eb")};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    width: 60px;
    margin-left: 14rem;
  }
`;
export const Botao = styled.button`
  background-color: #164095;
  width: 260px;
  height: 50px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.875rem; /* text-sm */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem; /* rounded-lg */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #1e5bc6; /* hover:bg-blue-700 */
    transform: scale(1.01); /* hover:scale-[1.01] */
  }

  @media (max-width: 768px) {
    font-size: 0.775rem;
    width: 200px;
    height: 40px;
  }
`;

export const ManagerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: -46px;

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${(props) => (props.isDarkMode ? "#4b5563" : "#e5e7eb")};
    color: ${(props) => (props.isDarkMode ? "white" : "black")};
    font-size: 1.25rem;
    font-weight: 700;
  }

  .info {
    margin-left: 16px;

    .name {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .role {
      font-size: 1rem;
      color: #6b7280;
    }
  }
`;
