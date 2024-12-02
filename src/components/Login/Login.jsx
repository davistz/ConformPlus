import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import Lab from "../../img/cartoon-lab.png";
import MiniLogo from "../../img/logo-conform.png";

import * as s from "./Login.styled";

import { LOGINS } from "../../constants/logins";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";

const Login = () => {
  const [modeLogin, setModeLogin] = useState(true);
  const [logins, setLogins] = useState(LOGINS);

  const toggleMode = () => {
    setModeLogin(!modeLogin);
    setTransitionState((prevState) =>
      prevState === "isLogin" ? "isRegister" : "isLogin"
    );
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
    }, 2000);
  };
  const handleLogin = (data) => {
    const { email_logawdain, senha_login } = data;

    const user = logins.find(
      (login) =>
        login.email === email_logawdain && login.password === senha_login
    );

    if (user) {
      localStorage.setItem("person", JSON.stringify(user));
      toast.success("Login realizado com sucesso!", {
        style: { color: "black" },
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.error("Email ou senha incorreta!", { style: { color: "red" } });
    }
  };

  const handleRegister = (data) => {
    const newUser = {
      id: String(logins.length + 1),
      name: data.name_register,
      email: data.email_register,
      password: data.senha_register,
      telefone: data.telefone_register,
      permission: "Usuário",
      status: "active",
    };

    setLogins((prevLogins) => [...prevLogins, newUser]);

    toast.success("Cadastro realizado com sucesso!");
    setTimeout(() => {
      setModeLogin(true);
    }, 2000);
  };

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    errors: loginErrors,
  } = useForm();
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    errors: registerErrors,
  } = useForm();

  const [transitionState, setTransitionState] = useState("right");

  useEffect(() => {
    if (modeLogin) {
      setTransitionState("left");
    } else {
      setTransitionState("right");
    }
  }, [modeLogin]);

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
        {RecuperarSenha ? (
          <>
            <s.FormWrapper>
              <div></div>
              <s.FormContainer isActive={modeLogin}>
                <s.InfoLogin className={`slide-${transitionState}`}>
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

                <s.FormContainer>
                  <form onSubmit={handleLoginSubmit(handleLogin)}>
                    <s.InputLogin
                      style={{ display: modeLogin ? "block" : "none" }}
                    >
                      <div className="w-full h-[30px] flex justify-center items-center">
                        <img
                          className="max-sm:block hidden w-10"
                          src={MiniLogo}
                          alt=""
                        />
                        <s.Title>Login</s.Title>
                      </div>
                      <s.InputContainer>
                        <s.BoxInput>
                          <s.Label>Digite seu Email</s.Label>
                          <s.StyledInput
                            type="text"
                            placeholder="Insira seu email"
                            {...registerLogin("email_logawdain", {
                              required: "Informe seu email",
                            })}
                          />
                        </s.BoxInput>
                        <s.BoxInput>
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
                              {...registerLogin("senha_login", {
                                required: "Informe uma senha",
                              })}
                              style={{ paddingRight: "40px" }}
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              {showPassword ? (
                                <FaEye className="w-5 h-5 absolute max-sm:top-[5px] right-[15px] top-[14px] text-[#0e4afc]" />
                              ) : (
                                <FaEyeSlash className="w-5 h-5 absolute max-sm:top-[5px] right-[15px] top-[14px]" />
                              )}
                            </button>
                          </div>
                        </s.BoxInput>
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
                        <s.StyledButton type="submit" select="btn">
                          Entrar
                        </s.StyledButton>
                      </s.ButtonWrapper>
                    </s.InputLogin>
                  </form>
                  <form onSubmit={handleRegisterSubmit(handleRegister)}>
                    <s.InputRegister
                      style={{ display: modeLogin ? "none" : "block" }}
                    >
                      <div className="w-full h-[30px] mt-2 flex justify-center items-center">
                        <img
                          className="max-sm:block hidden w-10"
                          src={MiniLogo}
                          alt=""
                        />
                        <s.TitleRegister>Registrar</s.TitleRegister>
                      </div>

                      <s.RegisterContainer>
                        <s.BoxRegister>
                          <s.RegisterLabel>Digite seu Nome</s.RegisterLabel>
                          <s.StyledInput
                            placeholder="Insira seu nome"
                            {...registerRegister("name_register")}
                          />
                          {registerRegister.name_register && (
                            <s.ErrorMessage>
                              {registerRegister.name_register.message}
                            </s.ErrorMessage>
                          )}
                        </s.BoxRegister>
                        <s.BoxRegister>
                          <s.RegisterLabel>Digite seu Email</s.RegisterLabel>
                          <s.StyledInput
                            type="email"
                            placeholder="Insira seu email"
                            {...registerRegister("email_register")}
                          />
                          {registerRegister.email_register && (
                            <s.ErrorMessage>
                              {registerErrors.email_register.message}
                            </s.ErrorMessage>
                          )}
                        </s.BoxRegister>
                        <s.BoxRegister>
                          <s.RegisterLabel>Digite seu telefone</s.RegisterLabel>
                          <s.StyledInput
                            placeholder="Insira seu telefone"
                            {...registerRegister("telefone_register")}
                          />
                          {registerRegister.telefone_register && (
                            <s.ErrorMessage>
                              {registerErrors.telefone_register.message}
                            </s.ErrorMessage>
                          )}
                        </s.BoxRegister>
                        <s.BoxRegister>
                          <s.RegisterLabel>Digite sua Senha</s.RegisterLabel>

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
                              {...registerRegister("senha_register")}
                              style={{ paddingRight: "40px" }}
                            />
                            <button
                              type="button"
                              onClick={togglePasswordVisibility}
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              {showPassword ? (
                                <FaEye className="w-5 h-5 absolute max-sm:top-[5px] right-[15px] top-[14px] text-[#0e4afc]" />
                              ) : (
                                <FaEyeSlash className="w-5 h-5 absolute max-sm:top-[5px] right-[15px] top-[14px]" />
                              )}
                            </button>
                          </div>
                        </s.BoxRegister>
                      </s.RegisterContainer>

                      {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
                      <s.ButtonWrapper>
                        <s.StyledButtonRegister type="submit">
                          Registrar
                        </s.StyledButtonRegister>
                      </s.ButtonWrapper>
                    </s.InputRegister>
                  </form>
                </s.FormContainer>
              </s.FormContainer>
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
                      />
                    </div>
                  </s.BoxInput>
                </s.InputContainer>

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
