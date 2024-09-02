import User from "../img/user.png";
import { IoNotificationsSharp } from "react-icons/io5";

const Usuário = () => {
  return (
    <div className="flex items-center">
      <a href="">
        <IoNotificationsSharp className="text-[#4880FF] w-[27px] h-[30px] mr-[25px]" />
      </a>
      <a className="flex items-center flex-row" href="#">
        <img
          className="w-[64px] h-[64px] rounded-full mr-[10px]"
          src={User}
          alt="Foto do usuário"
        />
        <div className="ml-3 mr-[60px]">
          <h1 className="text-white font-semibold">Davi Souza</h1>
          <p className="text-[#F00000] text-sm">Admin</p>
        </div>
      </a>
    </div>
  );
};

export default Usuário;
