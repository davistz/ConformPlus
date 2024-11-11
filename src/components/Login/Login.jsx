import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";

import * as s from "./Login.styled";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const handleLogin = async (data) => {
    const { nome, senha } = data;

    try {
      const params = new URLSearchParams({
        username: nome,
        password: senha,
      });

      const response = await axios.post(
        "http://localhost:8080/login",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      console.log("Requisição concluída:", response);

      const usuario = response.data;
      if (usuario && usuario.username) {
        console.log("Usuário encontrado:", usuario);

        localStorage.setItem("user", JSON.stringify(usuario));
        toast.success("Login efetuado com sucesso!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        console.log("Usuário não encontrado ou resposta malformada.");
        setError("Email ou senha incorretos");
        toast.error("Erro de login: Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login");
      toast.error("Erro de login: Email ou senha incorretos");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleRecuperarSenha = () => {
    setRecuperarSenha(false);
  };
  const handleSenhaOn = () => {
    setRecuperarSenha(true);
  };
  const handleSenhaNova = () => {
    toast.success("Link de redefinir enviado com sucesso!");

    setTimeout(() => {
      setRecuperarSenha(true);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [RecuperarSenha, setRecuperarSenha] = useState(true);

  return (
    <s.Container>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Toaster toastOptions={{ style: { color: "black" } }} />
        <s.LogoImg src={Logo} alt="logo fsph" />
        {RecuperarSenha ? (
          <s.AuthContainer>
            <s.FormContainer>
              <div>
                <s.Title>Login</s.Title>
                <s.InputContainer>
                  <s.Label>Digite seu Nome</s.Label>
                  <s.StyledInput
                    type="text"
                    placeholder="Insira seu nome"
                    {...register("nome", {
                      required: "Informe seu nome",
                    })}
                  />
                  {errors.nome && (
                    <s.ErrorMesage>{errors.nome.message}</s.ErrorMesage>
                  )}
                  <s.Label>Digite sua Senha</s.Label>
                  <s.StyledInput
                    type="password"
                    placeholder="Digite sua senha"
                    {...register("senha", {
                      required: "Informe uma senha",
                    })}
                  />
                  {errors.senha && (
                    <s.ErrorMesage>{errors.senha.message}</s.ErrorMesage>
                  )}
                  <s.ForgotPasswordLink onClick={handleRecuperarSenha}>
                    Esqueceu a senha?
                  </s.ForgotPasswordLink>
                </s.InputContainer>
                <s.CheckboxContainer>
                  <s.CheckboxInput />
                  <s.CheckboxLabel>Salvar Senha</s.CheckboxLabel>
                </s.CheckboxContainer>
              </div>
              {error && <s.ErrorText>{error}</s.ErrorText>}
              <s.ButtonWrapper>
                <s.StyledButton select="btn" type="submit">
                  Entrar
                </s.StyledButton>
              </s.ButtonWrapper>
            </s.FormContainer>
            <s.SwitchAuthLink onClick={handleRegister}>
              Não possui login? Clique Aqui!
            </s.SwitchAuthLink>
          </s.AuthContainer>
        ) : (
          <s.AuthContainer>
            <s.FormContainerSenha>
              <s.Title>Recuperar Senha</s.Title>
              <s.InputContainerSenha>
                <s.Label>Digite seu E-mail de Recuperação</s.Label>
                <s.StyledInput
                  type="email"
                  placeholder="E-mail de recuperação"
                />
              </s.InputContainerSenha>
              <s.ButtonWrapper>
                <s.StyledButton select="btn" onClick={handleSenhaNova}>
                  Enviar Link de Redefinição
                </s.StyledButton>
              </s.ButtonWrapper>
            </s.FormContainerSenha>
            <s.SwitchAuthLink onClick={handleSenhaOn}>
              Já possui login? Clique Aqui!
            </s.SwitchAuthLink>
          </s.AuthContainer>
        )}
      </form>
    </s.Container>
  );
};

export default Login;
