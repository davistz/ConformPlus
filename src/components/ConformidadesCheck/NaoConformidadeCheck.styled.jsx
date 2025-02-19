import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

export const ModalContainer = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#2c2c2c" : "white")};
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  width: 90%;
  max-width: 950px;
  height: auto;
  max-height: 660px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 95%;
    height: auto;
  }
`;

export const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  transition: 0.05s;
  cursor: pointer;
  color: ${(props) => (props.isDarkMode ? "white" : "#4b4b4b")};

  &:hover {
    color: ${(props) => (props.isDarkMode ? "#cccccc" : "#b5b5b5")};
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Subtitle = styled.p`
  margin-top: 0.5rem;
  color: ${(props) => (props.isDarkMode ? "white" : "black")};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

export const Card = styled.div`
  background-color: ${(props) => (props.isDarkMode ? "#444444" : "#dadada")};
  color: ${(props) => (props.isDarkMode ? "white" : "black")};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  background-color: #e52727;
  border-radius: 10px;
  height: 30px;
  width: 100%;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  transition: 0.3s;

  &:hover {
    background-color: #a31010;
  }

  &:last-child {
    background-color: #16b01b;

    &:hover {
      background-color: #0e8c13;
    }
  }
`;

export const EmptyMessage = styled.h1`
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
  color: ${({ isDarkMode }) => (isDarkMode ? "#FFFFFF" : "#4A4A4A")};
  font-weight: semibold;
  opacity: 0.8;

  @media (max-width: 680px) {
    font-size: 1rem;
  }
`;
