import BarraLateral from "../components/BarraLateral";
import Header from "../components/Header";
import Users from "../components/UsersPage";

const UsersPage = () => {
  return (
    <div className="flex-col">
      <Header />
      <div className="flex">
        <BarraLateral className="h-[877px]" />
        <Users />
      </div>
    </div>
  );
};

export default UsersPage;
