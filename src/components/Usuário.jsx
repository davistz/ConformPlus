import User from "../img/user.png";

const Usuário = () => {
  return (
    <div className="flex items-center">
      <a className="flex items-center flex-row" href="#">
        <img
          className="w-[64px] h-[64px] rounded-full mr-[10px]"
          src={User}
          alt="Foto do usuário"
        />
        <div className="ml-3 mobile:hidden mr-[60px]">
          <h1 className="text-white font-semibold">Davi Souza</h1>
          <p className="text-[#F00000] text-sm">Admin</p>
        </div>
      </a>
    </div>
  );
};

export default Usuário;
