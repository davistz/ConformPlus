import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import Lab from "../../img/cartoon-lab.png";
import MiniLogo from "../../img/logo-conform.png";

import * as s from "./Login.styled";

import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [modeLogin, setModeLogin] = useState(true);

  const toggleMode = () => setModeLogin((prevMode) => !prevMode);

  const handleLogin = async (data) => {
    const { nome, senha } = data;

    try {
      const response = await axios.get("http://localhost:3001/logins", {
        params: {
          name: nome,
          password: senha,
        },
      });

      const usuarios = response.data;

      if (usuarios.length > 0) {
        const usuario = usuarios[0];
        console.log("Usuário encontrado:", usuario);

        localStorage.setItem("person", JSON.stringify(usuario));

        toast.success("Login realizado com sucesso!", {
          style: { color: "black" },
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        throw new Error("Usuário ou senha incorretos");
      }
    } catch (error) {
      toast.error("Email ou senha incorreta!", {
        style: { color: "red" },
      });
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
      <Toaster
        toastOptions={{
          style: {
            fontSize: "14px",
          },
          success: {
            style: {
              color: "black",
            },
          },
          error: {
            style: {
              color: "red",
            },
          },
        }}
      />
      <s.LogoImg src={Logo} alt="logo fsph" />
      <s.AuthContainer>
        <s.FormWrapper className={modeLogin ? "slide-in" : "slide-out"}>
          {modeLogin ? (
            <form onSubmit={handleSubmit(handleLogin)}>
              <s.FormContainer>
                <s.InfoLogin
                  className={modeLogin ? "slide-left" : "slide-right"}
                >
                  <s.MiniImg className="mt-4" src={MiniLogo} alt="logo fsph" />
                  <h1 className="font-bold text-[40px] mb-2 mt-[50px]">
                    Conform<span className="text-[#508aff]">Plus</span>
                  </h1>
                  <p className="text-center mb-8">
                    Gerencie e resolva não conformidades
                    <br /> com eficiência e simplicidade.
                  </p>
                  <s.LabImg src={Lab} alt="logo fsph" />
                </s.InfoLogin>

                <s.InputLogin>
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

                  {error && <s.ErrorText>{error}</s.ErrorText>}
                  <s.ButtonWrapper>
                    <s.StyledButton select="btn" type="submit">
                      Entrar
                    </s.StyledButton>
                  </s.ButtonWrapper>
                </s.InputLogin>
              </s.FormContainer>
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleRegister)}>
              <s.FormContainer>
                <s.InputRegister>
                  <s.TitleRegister>Registrar</s.TitleRegister>
                  <s.RegisterContainer>
                    <s.Label>Digite seu Nome</s.Label>
                    <s.StyledInput
                      placeholder="Insira seu nome"
                      {...register("name", {
                        required: "Informe um nome",
                      })}
                    />
                    {errors.name && (
                      <s.ErrorMesage>{errors.name.message}</s.ErrorMesage>
                    )}

                    <s.Label>Digite seu Email</s.Label>
                    <s.StyledInput
                      type="email"
                      placeholder="Insira seu email"
                      {...register("email", {
                        required: "Informe um email",
                      })}
                    />
                    {errors.email && (
                      <s.ErrorMesage>{errors.email.message}</s.ErrorMesage>
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
                  </s.RegisterContainer>
                  {error && <s.ErrorMesage>{error}</s.ErrorMesage>}
                  <s.ButtonWrapper>
                    <s.StyledButtonRegister type="submit">
                      Registrar
                    </s.StyledButtonRegister>
                  </s.ButtonWrapper>
                </s.InputRegister>
                <s.InfoRegister
                  className={modeLogin ? "slide-left" : "slide-right"}
                >
                  <s.MiniImg className="mt-4" src={MiniLogo} alt="logo fsph" />
                  <h1 className="font-bold text-[40px] mb-2 mt-[50px]">
                    Conform<span className="text-[#508aff]">Plus</span>
                  </h1>
                  <p className="text-center mb-8">
                    Gerencie e resolva não conformidades
                    <br /> com eficiência e simplicidade.
                  </p>
                  <s.LabImg src={Lab} alt="logo fsph" />
                </s.InfoRegister>
              </s.FormContainer>
            </form>
          )}
        </s.FormWrapper>
        <s.SwitchAuthLink onClick={() => toggleMode()}>
          {modeLogin
            ? "Não possui login? Clique Aqui!"
            : "Já possui login? Clique Aqui!"}
        </s.SwitchAuthLink>
      </s.AuthContainer>
      ;
    </s.Container>
  );
};

export default Login;
