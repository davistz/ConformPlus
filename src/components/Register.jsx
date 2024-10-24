import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../img/logo.png";
import Botao from "./Botao";
import Input from "./Input";
import { toast, Toaster } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
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
      permission: "Usuario",
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
    <div className="w-screen h-screen flex flex-col  items-center bg-[#164095]">
      <Toaster
        toastOptions={{
          style: {
            color: "black",
          },
        }}
      />
      <img src={Logo} className="w-[545px] mt-[60px] h-auto" alt="logo fsph" />
      <div className="mt-8 max-sm:w-[420px] max-md:w-[500px] md:w-[600px] h-full md:h-[460px] lg:w-[590px] lg:h-[660px] justify-between bg-white flex flex-col rounded-[24px]">
        <div>
          <div className="flex justify-center my-8 md:mb-10 lg:mb-10">
            <h1 className="text-3xl font-bold">Registro</h1>
          </div>
          <div className="pl-6 relative mr-6">
            <Input
              label="Nome"
              placeholder="Insira seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[45px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#000000] border border-[#A6A6A6]"
            />
            <Input
              label="Email"
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[45px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#000000] border border-[#A6A6A6]"
            />
            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[45px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#000000] border border-[#A6A6A6]"
            />
            <Input
              type="password"
              label="Confirme sua Senha"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-[45px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#000000] border border-[#A6A6A6]"
            />
            <label htmlFor="permission" className="block text-sm ">
              Permissão:
            </label>
            <select
              id="permission"
              name="permission"
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Selecione uma permissão</option>
              <option value="Admin">Admin</option>
              <option value="Usuário">Usuário</option>
              <option value="Gestor">Gestor</option>
            </select>
          </div>
        </div>
        <div className="rounded-b-lg">
          <div className="flex justify-center mb-2">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Botao
            className="w-full rounded-b-[24px] h-[60px] "
            select="btn"
            onClick={handleRegister}
          >
            Registrar
          </Botao>
        </div>
      </div>
      <p
        className="text-white mt-4 hover:scale-[1.03] transition cursor-pointer"
        onClick={handleLogin}
      >
        Já possui login? Clique aqui!
      </p>
    </div>
  );
};

export default Register;
