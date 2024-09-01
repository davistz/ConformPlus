import Logo from "../img/logo.png";

const Header = () => {
  return (
    <div className="flex bg-[#164095]">
      <img className="w-96" src={Logo} alt="" />
      <h1 className="">Header</h1>
      <p>descrição</p>
    </div>
  );
};

export default Header;
