import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import Lab from "../../img/cartoon-lab.png";
import MiniLogo from "../../img/logo-conform.png";

import * as s from "./Login.styled";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [modeLogin, setModeLogin] = useState(true);

  const toggleMode = () => setModeLogin((prevMode) => !prevMode);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (data) => {
    const { email, senha } = data;

    try {
      const response = await axios.get("http://localhost:3001/logins", {
        params: {
          email: email,
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
  const handleRegister = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/logins", {
        name: data.name,
        email: data.email,
        password: data.senha,
        permission: "Usuário",
        status: "active",
      });
      console.log("Usuário criado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }

    toast.success("Cadastro realizado com sucesso!");
    setTimeout(() => {
      setModeLogin((prevMode) => !prevMode);
    }, 2000);
  };

  const handleRecuperarSenha = () => {
    setRecuperarSenha(false);
  };
  const handleSenhaOn = () => {
    setRecuperarSenha(true);
  };
  const handleSenhaNova = () => {
    toast.success("Link de redefinir enviado com sucesso!");
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

      {/* <s.InputContainerSenha>
                  <s.Label>Digite seu E-mail de Recuperação</s.Label>
                  <s.StyledInput
                    type="email"
                    placeholder="E-mail de recuperação"
                  />
                </s.InputContainerSenha> */}

      {/* <s.SwitchAuthLink onClick="{handleSenhaOn}">
                Sabe sua senha? Clique Aqui!
              </s.SwitchAuthLink> */}

      <s.LogoImg src={Logo} alt="logo fsph" />
      <s.AuthContainer>
        {RecuperarSenha ? (
          <>
            <s.FormWrapper className={modeLogin ? "slide-in" : "slide-out"}>
              {modeLogin ? (
                <form onSubmit={handleSubmit(handleLogin)}>
                  <s.FormContainer>
                    <s.InfoLogin
                      className={modeLogin ? "slide-left" : "slide-right"}
                    >
                      <s.MiniImg
                        className="mt-4"
                        src={MiniLogo}
                        alt="logo fsph"
                      />
                      <h1 className="font-bold text-[40px] mb-2 mt-[50px] max-sm:text-lg max-sm:mt-3">
                        Conform<span className="text-[#508aff] ">Plus</span>
                      </h1>
                      <p className="text-center max-sm:text-sm mb-8">
                        Gerencie e resolva não conformidades
                        <br /> com eficiência e simplicidade.
                      </p>
                      <s.LabImg src={Lab} alt="logo fsph" />
                    </s.InfoLogin>

                    <s.InputLogin>
                      <s.Title>Login</s.Title>
                      <s.InputContainer>
                        <s.BoxInput>
                          <s.Label>Digite seu Email</s.Label>
                          <s.StyledInput
                            type="text"
                            placeholder="Insira seu email"
                            {...register("email", {
                              required: "Informe seu email",
                            })}
                          />
                          {errors.email && (
                            <s.ErrorMesage>
                              {errors.email.message}
                            </s.ErrorMesage>
                          )}
                        </s.BoxInput>

                        <s.Label>Digite sua Senha</s.Label>
                        <div
                          style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <s.StyledInput
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                            {...register("senha", {
                              required: "Informe uma senha",
                            })}
                            style={{ paddingRight: "40px" }} // Espaço para o ícone
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            style={{
                              // position: "absolute",

                              // right: "15px",
                              // top: "14px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <FaEye className="w-5 h-5 absolute right-[15px] top-[14px] text-[#0e4afc]" />
                            ) : (
                              <FaEyeSlash className="w-5 h-5 absolute right-[15px] top-[14px]" />
                            )}
                          </button>
                        </div>
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
                  <s.FormContainerRegister>
                    <s.InputRegister>
                      <s.TitleRegister>Registrar</s.TitleRegister>
                      <s.RegisterContainer>
                        <s.BoxRegister>
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
                        </s.BoxRegister>
                        <s.BoxRegister>
                          <s.Label>Digite seu Email</s.Label>
                          <s.StyledInput
                            type="email"
                            placeholder="Insira seu email"
                            {...register("email", {
                              required: "Informe um email",
                            })}
                          />
                          {errors.email && (
                            <s.ErrorMesage>
                              {errors.email.message}
                            </s.ErrorMesage>
                          )}
                        </s.BoxRegister>
                        <s.BoxRegister>
                          <s.Label>Digite sua Senha</s.Label>
                          <s.StyledInput
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("senha", {
                              required: "Informe uma senha",
                            })}
                          />
                          {errors.senha && (
                            <s.ErrorMesage>
                              {errors.senha.message}
                            </s.ErrorMesage>
                          )}
                        </s.BoxRegister>
                      </s.RegisterContainer>
                      {error && <s.ErrorMesage>{error}</s.ErrorMesage>}
                      <s.ButtonWrapper>
                        <s.StyledButtonRegister type="submit">
                          Registrar
                        </s.StyledButtonRegister>
                      </s.ButtonWrapper>
                      <div className="flex ml-[65px] mb-4 min-[430px]:hidden">
                        <s.MiniImg
                          className="mt-3"
                          src={MiniLogo}
                          alt="logo fsph"
                        />
                        <h1 className="font-bold text-[30px] mt-3 text-black">
                          Conform<span className="text-[#508aff]">Plus</span>
                        </h1>
                      </div>
                    </s.InputRegister>
                    <s.InfoRegister
                      className={modeLogin ? "slide-left" : "slide-right"}
                    >
                      <s.MiniImg
                        className="mt-4"
                        src={MiniLogo}
                        alt="logo fsph"
                      />
                      <h1 className="font-bold text-[40px] mb-2 mt-[50px]">
                        Conform<span className="text-[#508aff]">Plus</span>
                      </h1>
                      <p className="text-center mb-8">
                        Gerencie e resolva não conformidades
                        <br /> com eficiência e simplicidade.
                      </p>
                      <s.LabImg src={Lab} alt="logo fsph" />
                    </s.InfoRegister>
                  </s.FormContainerRegister>
                </form>
              )}
            </s.FormWrapper>
            <s.SwitchAuthLink onClick={() => toggleMode()}>
              {modeLogin
                ? "Não possui login? Clique Aqui!"
                : "Já possui login? Clique Aqui!"}
            </s.SwitchAuthLink>
          </>
        ) : (
          <>
            <s.FormContainer>
              <s.InfoLogin className={modeLogin ? "slide-left" : "slide-right"}>
                <s.MiniImg className="mt-4" src={MiniLogo} alt="logo fsph" />
                <h1 className="font-bold text-[40px] mb-2 mt-[50px] max-sm:text-lg max-sm:mt-3">
                  Conform<span className="text-[#508aff] ">Plus</span>
                </h1>
                <p className="text-center max-sm:text-sm mb-8">
                  Gerencie e resolva não conformidades
                  <br /> com eficiência e simplicidade.
                </p>
                <s.LabImg src={Lab} alt="logo fsph" />
              </s.InfoLogin>

              <s.InputLogin>
                <s.Title>Recuperar Senha</s.Title>
                <s.InputContainer>
                  <s.BoxInput>
                    <div className="mt-12">
                      <s.Label>Digite seu Email</s.Label>
                      <s.StyledInput
                        type="text"
                        placeholder="Insira seu email"
                        {...register("email", {
                          required: "Informe seu email",
                        })}
                      />
                      {errors.email && (
                        <s.ErrorMesage>{errors.email.message}</s.ErrorMesage>
                      )}
                    </div>
                  </s.BoxInput>
                </s.InputContainer>

                {error && <s.ErrorText>{error}</s.ErrorText>}
                <s.ButtonWrapper>
                  <div className="w-full ml-[140px] mt-[110px]">
                    <s.StyledButtonPassword
                      select="btn"
                      onClick={() => handleSenhaNova()}
                    >
                      Enviar Email de Redefinição
                    </s.StyledButtonPassword>
                  </div>
                </s.ButtonWrapper>
              </s.InputLogin>
            </s.FormContainer>
            <s.SwitchAuthLink onClick={() => handleSenhaOn()}>
              Sabe sua senha? Clique Aqui!
            </s.SwitchAuthLink>
          </>
        )}
      </s.AuthContainer>
    </s.Container>
  );
};

export default Login;
