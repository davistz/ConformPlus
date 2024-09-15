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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#164095]">
      <Toaster
        toastOptions={{
          style: {
            color: "black",
          },
        }}
      />
      <img
        src={Logo}
        className="w-[545px] h-[127px] md:w-[446px] md:h-[100px]"
        alt="logo fsph"
      />
      <div className="md:mt-[30px] md:w-[430px] md:h-[600px] lg:w-[630px] justify-end lg:h-[500px] bg-white flex flex-col rounded-[24px] ">
        <div className="flex justify-center md:mb-10 lg:mb-10">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="pl-[56px] relative">
          <Input
            label="Email"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[516px] h-[56px] md:w-[316px] md:h-[45px] lg:w-[516px] lg:h-[50px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
          />
          <div className="relative">
            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[516px] h-[56px] md:w-[316px] md:h-[45px] lg:w-[516px] lg:h-[50px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
            />
            <a
              href="#"
              className="absolute right-14 top-2 font-medium text-sm text-[#404040] hover:text-[#48a7ff] transition-colors"
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

          <div className="flex-col md:mt-[35px]">
            <div className="flex justify-center md:mr-[50px] lg:mr-10 mb-5 gap-[45px]"></div>
          </div>
        </div>
        <div className="lg:pb-4">
          <div className="flex justify-center mb-2">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Botao
            className="md:w-full md:rounded-b-md md:h-[60px] lg:w-[418px] lg:ml-[105px] lg:rounded-lg"
            select="btn"
            onClick={handleLogin}
          >
            Entrar
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default Login;
