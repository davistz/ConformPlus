import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import * as s from "./Register.styled";
import { toast, Toaster } from "sonner";
import { useForm } from "react-hook-form";
import Lab from "../../img/cartoon-lab.png";
import MiniLogo from "../../img/logo-conform.png";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, password, confirmPassword, permission } = data;

    if (password !== confirmPassword) {
      setError("As senhas não correspondem");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("LOGINS")) || [];
    const isUserExist = existingUser.find((user) => user.email === email);

    if (isUserExist) {
      setError("Email já cadastrado.");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      permission,
    };

    const updatedLogins = [...existingUser, newUser];
    localStorage.setItem("LOGINS", JSON.stringify(updatedLogins));

    toast.success("Registro efetuado com sucesso!");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <s.Container>
      <Toaster toastOptions={{ style: { color: "black" } }} />
      <s.LogoImg src={Logo} alt="logo fsph" />

      {modeLogin ? (
        <form onSubmit={handleSubmit(handleLogin)}>
          <s.AuthContainer>
            <s.FormContainer>
              <s.InfoLogin>
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
            <s.SwitchAuthLink onClick={handleRegister}>
              Não possui login? Clique Aqui!
            </s.SwitchAuthLink>
          </s.AuthContainer>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleRegister)}>
          <s.AuthContainer>
            <s.FormContainer>
              <s.InfoLogin>
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
              <div>
                <s.Title>Registrar</s.Title>
                <s.InputContainer>
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

                  <s.Label>Digite sua Senha Novamente</s.Label>
                  <s.StyledInput
                    type="password"
                    placeholder="Confirme sua senha"
                    {...register("senhaConfirm", {
                      required: "Informe uma senha novamente",
                    })}
                  />
                  {errors.senhaConfirm && (
                    <s.ErrorMesage>{errors.senhaConfirm.message}</s.ErrorMesage>
                  )}

                  <s.SelectContainer>
                    <s.SelectorLabelDiv>
                      <s.Label>Escolha seu cargo</s.Label>
                      {errors.cargo && (
                        <s.ErrorMesage>{errors.cargo.message}</s.ErrorMesage>
                      )}
                    </s.SelectorLabelDiv>
                    <s.StyledSelect
                      {...register("cargo", {
                        required: "Informe um cargo",
                      })}
                    >
                      <option value="" disabled>
                        Selecione uma opção
                      </option>
                      <option value="Usuario">Usuário</option>
                      <option value="Gestor">Gestor</option>
                      <option value="Admin">Admin</option>
                    </s.StyledSelect>
                  </s.SelectContainer>
                </s.InputContainer>
              </div>
              {error && <s.ErrorMesage>{error}</s.ErrorMesage>}
              <s.ButtonWrapper>
                <s.StyledButton type="submit">Registrar</s.StyledButton>
              </s.ButtonWrapper>
            </s.FormContainer>
          </s.AuthContainer>
        </form>
      )}
      <s.SwitchAuthLink onClick={modeLogin ? handleRegister : handleLogin}>
        {modeLogin
          ? "Não possui login? Clique Aqui!"
          : "Já possui login? Clique Aqui!"}
      </s.SwitchAuthLink>
    </s.Container>
  );
};

export default Register;
