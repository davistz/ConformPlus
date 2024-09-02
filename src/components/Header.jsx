import Logo from "../img/logo.png";
import BarraPesquisa from "./BarraPesquisa";
import Usuário from "./Usuário";

const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center bg-[#164095] px-4 py-5">
      <div className="flex items-center col-span-2">
        <img className="w-[330px]" src={Logo} alt="Logo" />
        <BarraPesquisa />
      </div>
      <div className="flex justify-end">
        <Usuário />
      </div>
    </div>
  );
};

export default Header;
