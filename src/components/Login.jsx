import Logo from "../img/logo.png";
import Checkbox from "./Checkbox";
import Input from "./Input";

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#164095]">
      <img src={Logo} className="w-[545px] h-[127px]" alt="logo fsph" />
      <div className="mt-[60px] w-[630px] h-[735px] bg-white flex flex-col rounded-[24px] ">
        <div className="flex justify-center h-[126px] items-center">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="pl-[56px]">
          <Input
            label="Email"
            placeholder="Insira seu e-mail"
            className="w-[516px] h-[56px]  mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            className="w-[516px] h-[56px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
          />
          <Input
            label="Confirmar Senha"
            placeholder="Digite sua senha novamente"
            className="w-[516px] h-[56px] font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
          />

          <Checkbox label="Salvar Senha" name="Salvar" id="Salvar" />
        </div>
      </div>
    </div>
  );
};

export default Login;
