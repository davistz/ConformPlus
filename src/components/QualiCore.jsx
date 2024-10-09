import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const QualiCoreDashboard = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  return (
    <div className="qualicore-dashboard">
      <aside>
        <div className="divisaoSideBar">
          <div className="conteudoSideBar">
            <img
              src="css/js/img/qualicore.svg"
              alt="qualiCoreLogo"
              width="290rem"
              height="auto"
            />
          </div>
          <div className="conteudoSideBar">
            <button type="button">
              <i className="bi bi-house-door"></i>Dashboard
            </button>
            <button type="button">
              <i className="bi bi-clipboard2-data-fill"></i>Relatório de
              Qualidade
            </button>
            <button type="button">
              <i className="bi bi-exclamation-triangle"></i>RNC
            </button>
            <button type="button">
              <i className="bi bi-graph-up"></i>Gráficos Detalhados
            </button>
            <button type="button">
              <i className="bi bi-clock"></i>Monitoramento
            </button>
            <button type="button">
              <i className="bi bi-grid"></i>Departamentos
            </button>
            <button type="button">
              <i className="bi bi-people"></i>Usuários
            </button>
          </div>
        </div>
        <div className="divisaoSideBar">
          <div className="conteudoSideBar">
            <h5>QualiCore - Governo do Estado de Sergipe</h5>
            <h6>2024 Fundação de Saúde Parreiras Horta</h6>
          </div>
          <div className="conteudoSideBar">
            <h5>FSPH - Sergipe</h5>
          </div>
        </div>
      </aside>
      <main>
        <section className="secaoPrincipal">
          <div className="containerBusca">
            <input
              type="text"
              id="busca"
              className="campoBusca"
              placeholder="Procurar"
            />
            <i className="bi bi-search iconeBusca"></i>
          </div>
          <div className="botoesAcao">
            <button type="button" className="botaoIcone">
              <i className="bi bi-bell"></i>
            </button>
            <button type="button" className="botaoIcone">
              <i className="bi bi-envelope"></i>
            </button>
          </div>
          <hr />
          <div className="infoUsuario">
            <span>Olá, Gustavo</span>
            <div className="avatarUsuario" onClick={toggleDropdown}>
              <i className="bi bi-person"></i>
            </div>
            {showProfileDropdown && (
              <div className="dropdownPerfil">
                <a className="itemDropdown" onClick={toggleProfileModal}>
                  <i className="bi bi-person-circle"></i> Meu Perfil
                </a>
                <a href="#" className="itemDropdown">
                  <i className="bi bi-bell"></i> Notificações
                </a>
                <div className="separadorDropdown"></div>
                <a href="index.html" className="itemDropdown">
                  <i className="bi bi-box-arrow-right"></i> Sair
                </a>
              </div>
            )}
          </div>
        </section>
        <nav className="navPrincipal">
          <div className="divisaoTexto">
            <h2 className="tituloPagina">Dashboard</h2>
            <span className="saudacaoUsuario">
              Olá Gustavo, bem-vindo ao seu painel principal!
            </span>
          </div>
        </nav>

        <div className="graficoCard">
          <div className="grafico-container">
            <canvas id="meuGrafico"></canvas>
          </div>
          <div className="grafico-container">
            <canvas id="meuGraficoRosca"></canvas>
          </div>
          <div className="grafico-container">
            <canvas id="meuGraficoLinhas"></canvas>
          </div>
        </div>

        <div className="graficoCard">
          <div className="grafico-container">
            <canvas id="meuGraficoBar"></canvas>
          </div>
          <div className="grafico-container">
            <canvas id="meuGraficoArea"></canvas>
          </div>
          <div className="grafico-container">
            <canvas id="meuGraficoMisto"></canvas>
          </div>
        </div>

        {showProfileModal && (
          <div className="modalPerfil" style={{ display: "block" }}>
            <div className="conteudoModal">
              <div className="modalHeader">
                <h2>Meu Perfil</h2>
                <button className="fecharModal" onClick={toggleProfileModal}>
                  &times;
                </button>
              </div>
              <div className="modalBody">
                <div className="profileImageContainer">
                  <img
                    src="guga.jpg"
                    alt="Profile Picture"
                    className="profileImage"
                  />
                  <button className="changePhotoBtn">Alterar foto</button>
                </div>
                <form className="profileForm">
                  <div className="formGroup">
                    <label htmlFor="nomeProfissional">
                      Nome do Profissional
                    </label>
                    <input
                      type="text"
                      id="nomeProfissional"
                      className="inputPadrao"
                      value="Gustavo Machado Trindade"
                      disabled
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="departamento">Departamento</label>
                    <input
                      type="text"
                      id="departamento"
                      className="inputPadrao"
                      value="Tecnologia da Informação - TI"
                      disabled
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="lider">Líder Direto</label>
                    <input
                      type="text"
                      id="lider"
                      className="inputPadrao"
                      value="Ovidio Batista Trindade Neto"
                      disabled
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="emailRegistrado">Email Institucional</label>
                    <input
                      type="email"
                      id="emailRegistrado"
                      className="inputPadrao"
                      value="gustavo.trindade@fsph.com.br"
                      disabled
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="cargo">Cargo</label>
                    <input
                      type="text"
                      id="cargo"
                      className="inputPadrao"
                      value="Desenvolvedor Web Front-End"
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QualiCoreDashboard;
