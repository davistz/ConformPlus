import BarraLateral from "../components/BarraLateral";
import Header from "../components/Header";
import Users from "../components/UsersPage";

const UsersPage = () => {
  return (
    <div className="flex-col ">
      <Header />

      <div className="flex">
        <BarraLateral className="hidden lg:flex" />

        <div className="">
          <Users />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
