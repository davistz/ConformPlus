import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 829px;
  margin-top: 1rem;
  width: 80%;

  @media (max-width: 640px) {
    height: auto;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  margin-left: 12px;
  margin-top: 130px;

  @media (max-width: 640px) {
    flex-direction: column;
    margin-left: 0;
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
  }

  select {
    width: 140px;
    height: 40px;

    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    background-color: #fff;
    cursor: pointer;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 640px) {
    justify-content: center;
  }

  @media (min-width: 1280px) {
    width: 100%;
  }
`;

export const BtnAdd = styled.button`
  background-color: #164095;
  width: 260px;
  height: 50px;
  padding: 0 8px;
  font-size: 0.875rem;
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
  }
`;

export const BtnCheck = styled.button`
  background-color: #ffb74d;
  width: 220px;
  height: 50px;
  padding: 0 8px;
  font-size: 0.875rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffa827;
  }

  @media (max-width: 640px) {
    width: 100%;
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
  background-color: #e1e1e1;
  border-radius: 16px;
  padding: 20px;
  width: 100%;

  @media (min-width: 1280px) {
    width: 1480px;
  }

  @media (max-width: 640px) {
    width: 100%;
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
    margin-left: 0;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }
`;
