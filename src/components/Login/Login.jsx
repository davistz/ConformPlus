import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import Lab from "../../img/cartoon-lab.png";
import MiniLogo from "../../img/logo-conform.png";

import * as s from "./Login.styled";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const [modeLogin, setModeLogin] = useState(true);

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

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    const { email, senha } = data;
    console.log("apertou");

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
        toast.error("Email ou senha incorreta!", {
          style: { color: "red" },
        });
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
        name: data.name_register,
        email: data.email_register,
        password: data.senha_register,
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
              <form onSubmit={handleSubmit(handleLogin)}>
                <s.FormContainer isActive={modeLogin}>
                  <s.InfoLogin className={`slide-${transitionState}`}>
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

                  <s.InputLogin
                    style={{ display: modeLogin ? "block" : "none" }}
                  >
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
                          <s.ErrorMessage>
                            {errors.email.message}
                          </s.ErrorMessage>
                        )}
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
                            {...register("senha", {
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
                        {errors.senha && (
                          <s.ErrorMessage>
                            {errors.senha.message}
                          </s.ErrorMessage>
                        )}
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
                  <s.InputRegister
                    style={{ display: modeLogin ? "none" : "block" }}
                  >
                    <s.TitleRegister>Registrar</s.TitleRegister>
                    <s.RegisterContainer>
                      <s.BoxRegister>
                        <s.Label>Digite seu Nome</s.Label>
                        <s.StyledInput
                          placeholder="Insira seu nome"
                          {...register("name_register")}
                        />
                        {errors.name && (
                          <s.ErrorMessage>{errors.name.message}</s.ErrorMessage>
                        )}
                      </s.BoxRegister>
                      <s.BoxRegister>
                        <s.Label>Digite seu Email</s.Label>
                        <s.StyledInput
                          type="email"
                          placeholder="Insira seu email"
                          {...register("email_register")}
                        />
                        {errors.email && (
                          <s.ErrorMessage>
                            {errors.email.message}
                          </s.ErrorMessage>
                        )}
                      </s.BoxRegister>
                      <s.BoxRegister>
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
                            {...register("senha_register")}
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
                      <s.StyledButtonRegister
                        onClick={() => {
                          toast.success("Cadastro realizado com sucesso!");
                          setTimeout(() => {
                            setModeLogin((prevMode) => !prevMode);
                          }, 2000);
                        }}
                      >
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
                </s.FormContainer>
              </form>
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
                        {...register("email-forget", {
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
