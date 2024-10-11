import BarraLateral from "../components/BarraLateral";
import Header from "../components/Header";
import Users from "../components/UsersPage";

const UsersPage = () => {
  return (
    <div className="flex-col ">
      {/* Header fixo no topo */}
      <Header />

      {/* Container para o conteúdo principal */}
      <div className="flex">
        {/* Barra lateral fixa à esquerda */}
        <BarraLateral className="hidden lg:flex" />
        {/* Conteúdo de Users com padding-top para compensar o header */}
        <div className="">
          <Users />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
