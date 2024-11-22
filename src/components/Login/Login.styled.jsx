import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 6rem;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? "#1e1e1e" : "#164095")};

  @media (max-width: 768px) {
    padding-top: 4rem;
  }

  @media (max-width: 480px) {
    padding-top: 2rem;
  }
`;

export const LogoImg = styled.img`
  width: 500px;
  height: auto;
  align-items: center;
  justify-items: center;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const BoxInput = styled.div`
  @media (max-width: 480px) {
    margin-top: -4rem;
    font-size: 10px;
  }
`;
export const BoxRegister = styled.div`
  @media (max-width: 480px) {
    width: 110%;
    margin-left: -1.6rem;
    font-size: 10px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 45px;
  margin-bottom: 1.5rem;
  font-weight: 500;
  padding-left: 0.6rem;
  background-color: ${(props) => (props.darkMode ? "#444" : "#f1f4f9")};
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  border: 1px solid #a6a6a6;
  border-radius: 0.5rem;

  @media (max-width: 480px) {
    height: 30px;
    margin-bottom: 0.6rem;
    font-size: 0.8rem;
    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;
export const Title = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  margin-left: -6rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};

  @media (max-width: 768px) {
    font-size: 1.9rem;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-top: -1rem;
    margin-bottom: 7rem;
  }
`;

export const TitleRegister = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1.7rem;
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const LabImg = styled.img`
  width: 200px;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
export const MiniImg = styled.img`
  width: 80px;
  height: auto;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 15%;
  }
`;

export const AuthContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    margin-top: 0.25rem;
    padding: 0 0.5rem;
  }
`;
export const FormWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
`;

export const FormContainer = styled.div`
  margin-top: 2rem;
  height: 560px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 24px;
  width: 1000px;
  overflow: hidden;
  position: relative;

  transition: opacity 0.5s ease;

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 20px;
    align-items: center;
    height: 370px;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 24px;
    width: 390px;
    overflow: hidden;
    position: relative;

    transition: opacity 0.5s ease;
  }
`;

export const InfoLogin = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 100%;
  background-color: #061c48;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;

  &.slide-left {
    transform: translateX(-100%);

    border-top-right-radius: 40%;
    border-bottom-right-radius: 40%;
  }

  &.slide-transition {
    border-radius: 20%;
  }

  &.slide-right {
    transform: translateX(0);
    border-top-left-radius: 40%;
    border-bottom-left-radius: 40%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const InfoRegister = styled.div`
  background-color: #061c48;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-top-right-radius: 22px;
  border-bottom-right-radius: 22px;
  border-bottom-left-radius: 40%;
  border-top-left-radius: 40%;
  transition: transform 0.5s ease;

  &.slide-right {
    transform: translateX(0);
  }

  &.slide-left {
    transform: translateX(-100%);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormContainerSenha = styled.div`
  margin-top: 2rem;
  width: 500px;
  height: 330px;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 24px;

  @media (max-width: 768px) {
    height: auto;
    width: 400px;
  }
`;

export const InputLogin = styled.div`
  width: 50%;
  position: absolute;

  right: -1rem;
  transition: transform 0.5s ease;

  @media (max-width: 768px) {
    height: auto;
    width: 400px;
    right: -0.5rem;
  }
`;

export const InputRegister = styled.div`
  width: 50%;

  position: absolute;

  left: 0;
  transition: transform 0.5s ease;

  @media (max-width: 768px) {
    height: auto;
    width: 400px;
    margin-bottom: 4rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3.5rem;
  margin-bottom: -1rem;
  margin-top: 3rem;

  position: relative;

  @media (max-width: 768px) {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
    margin-bottom: 0px;
  }
`;
export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3.5rem;
  margin-right: 2rem;
  margin-bottom: -1rem;
  margin-top: 3rem;

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

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 0.5rem;
  margin-top: -1.5rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-top: -9px;
    margin-bottom: 3px;
  }
`;

export const Label = styled.label`
  margin-bottom: 0.7rem;
  font-size: 1.2rem;
  font-weight: 500;
  display: block;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
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
    top: 0.1rem;
    font-size: 0.675rem;
  }

  &:hover {
    color: #48a7ff;
    transform: scale(1.03);
  }
`;

export const ErrorText = styled.p`
  color: vlue;
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    color: blue;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  color: black;
  font-weight: 700;
  background-color: #d4d4d4;
  border: 1px solid black;
  width: 70%;
  height: 51px;
  margin-top: 3.5rem;
  margin-left: -3.5rem;
  border-radius: 20px 20px;
  transition: 0.5s;

  @media (max-width: 768px) {
    height: 50px;
    margin-left: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 50%;
    height: 45px;
    margin-top: 0.5rem;
    margin-bottom: -1rem;
  }

  &:hover {
    color: white;
    background-color: #104dc9;
  }
`;
export const StyledButtonPassword = styled.button`
  color: black;
  font-weight: 700;
  background-color: #d4d4d4;
  border: 1px solid black;
  width: 100%;
  height: 51px;
  margin-top: 3.5rem;
  margin-left: -6.5rem;
  border-radius: 20px 20px;
  transition: 0.5s;

  @media (max-width: 768px) {
    height: 50px;
    margin-left: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    height: 45px;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
  }

  &:hover {
    color: white;
    background-color: #104dc9;
  }
`;

export const StyledButtonRegister = styled.button`
  color: black;
  font-weight: 700;
  background-color: #d4d4d4;
  border: 1px solid black;
  width: 60%;
  height: 51px;
  margin-top: 2rem;
  border-radius: 20px 20px;
  transition: 0.5s;

  @media (max-width: 768px) {
    height: 50px;
    width: 90%;
  }

  @media (max-width: 480px) {
    height: 45px;
    width: 60%;
    margin-top: 2rem;
    margin-bottom: -2rem;
  }

  &:hover {
    color: white;
    background-color: #104dc9;
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

export const SwitchAuthLink = styled.p`
  color: white;
  cursor: pointer;
  margin-top: 1rem;
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
  /* margin-left: 1.5rem; */

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-left: 1.5rem;
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

  @media (max-width: 480px) {
    font-size: 0.775rem;
  }
`;

//
