import Logo from "../img/logo.png";
import Botao from "./Botao";
import Checkbox from "./Checkbox";
import Input from "./Input";

const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#164095]">
      <img
        src={Logo}
        className="w-[545px] h-[127px] md:w-[446px] md:h-[100px]"
        alt="logo fsph"
      />
      <div className="mt-[60px] md:mt-[30px] md:w-[430px] md:h-[600px] lg:w-[630px] justify-end lg:h-[620px] bg-white flex flex-col rounded-[24px] ">
        <div className="flex justify-center md:mb-10 lg:mb-10">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="pl-[56px] relative">
          <Input
            label="Email"
            placeholder="Insira seu e-mail"
            className="w-[516px] h-[56px] md:w-[316px] md:h-[45px] lg:w-[516px] lg:h-[50px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
          />
          <div className="relative">
            <Input
              label="Senha"
              placeholder="Digite sua senha"
              className="w-[516px] h-[56px] md:w-[316px] md:h-[45px] lg:w-[516px] lg:h-[50px] mb-4 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
            />
            <a
              href="#"
              className="absolute right-14 top-2 font-medium text-sm text-[#404040]"
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            label="Confirmar Senha"
            placeholder="Digite sua senha novamente"
            className="w-[516px] h-[56px] md:w-[316px] md:h-[45px] lg:w-[516px] lg:h-[50px] mb-2 font-medium rounded-lg pl-5 bg-[#F1F4F9] text-[#A6A6A6] border border-[#A6A6A6]"
          />
          <Checkbox
            type="login"
            label="Salvar Senha"
            name="Salvar"
            id="Salvar"
          />

          <div className="flex-col mt-[55px] md:mt-[35px]">
            <div className="flex justify-center md:mr-[50px] lg:mr-10 mb-5 gap-[45px]">
              <Checkbox
                type="login"
                label="Administrador"
                name="Administrador"
                id="Administrador"
              />
              <Checkbox
                type="login"
                label="Usúario"
                name="Usúario"
                id="Usúario"
              />
            </div>
          </div>
        </div>
        <div className="lg:pb-4">
          <Botao
            className="md:w-full md:rounded-b-md md:h-[60px] lg:w-[418px] lg:ml-[105px] lg:rounded-lg"
            select="btn"
          >
            ENTRAR
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default Login;
