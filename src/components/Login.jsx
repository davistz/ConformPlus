import { useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import Botao from "./Botao";
import Checkbox from "./Checkbox";
import Input from "./Input";
import LOGINS from "../constants/logins";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = LOGINS.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login efetuado com sucesso!");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setError("Email ou senha incorretos");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#164095]">
      <Toaster
        toastOptions={{
          style: {
            color: "black",
          },
        }}
      />
      <img src={Logo} className="w-[545px] h-auto" alt="logo fsph" />
      <div className="mt-8 max-sm:w-[420px] max-md:w-[500px] md:w-[600px] h-auto md:h-[460px] lg:w-[590px] lg:h-[440px] justify-between bg-white flex flex-col rounded-[24px]">
        <div>
          <div className="flex justify-center my-8 md:mb-10 lg:mb-10">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="pl-6 relative mr-6">
            <Input
              label="Nome"
              placeholder="Insira seu nome"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[45px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#000000] border border-[#A6A6A6]"
            />
            <div className="relative">
              <Input
                type="password"
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[45px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#000000] border border-[#A6A6A6]"
              />
              <a
                href="#"
                className="absolute right-3 top-2 font-medium max-sm:right-8 max-sm:top-1 text-sm text-[#404040] hover:text-[#48a7ff] transition-colors"
              >
                Esqueceu a senha?
              </a>
            </div>
            <Checkbox
              type="login"
              label="Salvar Senha"
              name="Salvar"
              id="Salvar"
            />
          </div>
        </div>
        <div className="rounded-b-lg">
          <div className="flex justify-center mb-2">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Botao
            className="w-full rounded-b-[24px] h-[60px] "
            select="btn"
            onClick={handleLogin}
          >
            Entrar
          </Botao>
        </div>
      </div>
      <p
        className="text-white mt-4 hover:scale-[1.03] transition cursor-pointer"
        onClick={handleRegister}
      >
        Não possui login? Se Cadastre!
      </p>
    </div>
  );
};

export default Login;
