import Logo from "../img/logo.png";
import Usuário from "./Usuário";

const Header = () => {
  return (
    <div className="w-full grid grid-cols-1 tablet:grid-cols-3 items-center bg-[#164095] px-4 py-5">
      <div className="flex justify-center tablet:justify-start col-span-1 tablet:col-span-2">
        <img className="w-[150px] tablet:w-[330px]" src={Logo} alt="Logo" />
      </div>
      <div className="flex justify-center tablet:justify-end">
        <Usuário />
      </div>
    </div>
  );
};

export default Header;
