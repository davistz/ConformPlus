import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #164095;
`;

export const LogoImg = styled.img`
  width: 545px;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const InfoLogin = styled.div`
  background-color: #061c48;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-top-left-radius: 22px;
  border-bottom-left-radius: 22px;
`;
export const InputLogin = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MiniImg = styled.img`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;
export const LabImg = styled.img`
  width: 250px;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const AuthContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.div`
  margin-top: 2rem;
  width: 800px;

  height: 560px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 24px;

  @media (max-width: 768px) {
    height: auto;
    width: 400px;
  }
`;
export const FormContainerSenha = styled.div`
  margin-top: 2rem;
  width: 500px;
  height: 330px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px;

  @media (max-width: 768px) {
    height: auto;
    width: 400px;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1.2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  margin-right: 1.5rem;
  margin-bottom: -1rem;
  position: relative;
`;
export const InputContainerSenha = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  margin-right: 1.5rem;
  margin-top: -3rem;

  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 45px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  padding-left: 1.25rem;
  background-color: #f1f4f9;
  color: #000000;
  border: 1px solid #a6a6a6;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
  font-weight: 500;
  display: block;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ForgotPasswordLink = styled.a`
  position: absolute;
  top: 7rem;
  right: 1rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  color: #404040;
  transition: color 0.3s ease, transform 0.3s ease;

  @media (max-width: 768px) {
    top: 6.2rem;
  }

  &:hover {
    color: #48a7ff;
    transform: scale(1.03);
  }
`;

export const ErrorMesage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 0.5rem;
  margin-top: -1.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  color: white;
  background-color: #104dc9;
  width: 100%;
  height: 60px;
  border-radius: 0 0 20px 20px;
  transition: 0.3s;

  @media (max-width: 768px) {
    height: 50px;
  }

  &:hover {
    background-color: #0d2d6e;
  }
`;

export const SwitchAuthLink = styled.p`
  color: white;
  cursor: pointer;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  margin-right: 0.5rem;
  appearance: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.375rem;

  &:checked {
    background-color: #164095;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  font-weight: bold;
  color: #2022249b;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const SelectContainer = styled.div`
  margin-bottom: 3rem;
`;
export const SelectorLabelDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #a6a6a6;
  border-radius: 0.375rem;
  background-color: #f1f4f9;
  color: #000;
  font-size: 1rem;
  appearance: none;

  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: #164095;
    box-shadow: 0 0 0 3px rgba(22, 64, 149, 0.3);
  }
`;
