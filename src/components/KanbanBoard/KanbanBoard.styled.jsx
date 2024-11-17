import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  padding: 1rem;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 32rem;
  margin-bottom: 1rem;
  display: flex;
`;

export const Input = styled.input`
  flex: 1;
  height: 2.5rem;
  border-radius: 0.375rem;
  padding: 0 0.5rem;
`;

export const Button = styled.button`
  background-color: #3b82f6;
  margin-left: 1rem;
  border-radius: 0.375rem;
  padding: 0 1rem;
  color: white;
  font-weight: 500;
`;

export const KanbanContainer = styled.div`
  display: flex;
  margin-left: -2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-right: 4rem;
  }
`;

export const Column = styled.div`
  flex: 1;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const ProcessoStatus = styled.button`
  background-color: white;
`;

export const DeleteArea = styled.div`
  background-color: #ff6b6bc6;
  width: 102%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: -30px;
  border-radius: 5px;
  border: 2px dashed #f1f1f1;
`;

export const DeleteAreaText = styled.p`
  color: white;
  font-weight: bold;
  font-size: 1rem;
`;
