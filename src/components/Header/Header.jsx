import { useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import Logo from "../../img/logo-conform-white.png";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { IoIosGitNetwork, IoMdClose } from "react-icons/io";
import { PiUsersLight } from "react-icons/pi";
import { IoIosClose } from "react-icons/io";
import { MdLogout, MdLightMode, MdDarkMode } from "react-icons/md";
import { toast } from "sonner";
import daviAvatar from "../../img/img_users/davi.png";
import lucasAvatar from "../../img/img_users/lucas.png";
import * as s from "./Header.styled";
import { useTheme } from "../../ThemeContext";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("home");
  const { isDarkMode, toggleTheme } = useTheme();

  const handleButtonClick = (button) => {
    setActiveButton(button);
    navigate(`/${button}`);
  };

  const [personState, setPersonState] = useState(null);

  useEffect(() => {
    const storedPerson = localStorage.getItem("person");

    if (storedPerson) {
      setPersonState(JSON.parse(storedPerson));
    }
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const PermView = personState?.permission === "Usuário";

  const telaPequena = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveButton(path || "home");
  }, [location]);

  const notificacoes = [
    {
      responsavel: "Davi",
      avataResponsavel: daviAvatar,
      processoOrigem: "Não Conformidades",
      msg: "Criou uma nova não conformidade",
      nomeAutor: "Maria Santos",
      isNew: true,
    },
    {
      responsavel: "Lucas",
      avataResponsavel: lucasAvatar,
      processoOrigem: "Departamentos",
      msg: "Criou um novo departamento",
      nomeAutor: "Carlos Ferreira",
      isNew: false,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();

    toast.success("Deslogado com sucesso!");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  const handleHome = () => {
    navigate("/dashboard");
  };
  const handleUsers = () => {
    navigate("/users");
  };

  const handleDepartament = () => {
    navigate("/departamentos");
  };

  const renderizarNotificacoes = () => {
    return notificacoes.map((notificacao) => (
      <div
        className={`flex items-start p-4 border-b border-gray-200 ${
          notificacao.isNew ? "bg-blue-100" : "bg-white"
        }`}
        key={notificacao.processoOrigem}
      >
        <img
          className="w-12 h-11 rounded-full mr-3"
          src={notificacao.avataResponsavel}
          alt="Avatar"
        />
        <div className="flex-1">
          <strong>{notificacao.responsavel}</strong>
          <div className="mt-2 gap-1 flex flex-col">
            <p className="text-sm text-gray-500">
              Origem: {notificacao.processoOrigem}
            </p>
            <p className="text-sm">{notificacao.msg}</p>
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 1024;

      setIsSmallScreen(isSmall);
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getPermissionColor = (permission) => {
    switch (permission) {
      case "Admin":
        return "#ff0000";
      case "Gestor":
        return "#ff9f2a";
      case "Usuario":
        return "#bebebe";
      default:
        return "#bebebe";
    }
  };

  const initials = personState?.name
    ? personState.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <s.Layout>
      <s.HeaderContainer isOn={isDarkMode}>
        {isSmallScreen ? (
          <HiMenu
            className="w-10 h-10 text-white ml-4"
            onClick={toggleSidebar}
          />
        ) : (
          <s.Logo src={Logo} alt="Logo" onClick={handleHome} />
        )}

        <s.UserInfoContainer>
          <MdLightMode className="w-8 h-8 mr-2 text-[#ffffffdb]" />
          <s.SwitchContainer isOn={isDarkMode} onClick={toggleTheme}>
            <s.SwitchCircle isOn={isDarkMode} />
          </s.SwitchContainer>
          <MdDarkMode className="w-8 h-8 ml-2 mr-6 text-[#ffffffdb]" />
          <div className="max-sm:hidden">
            <s.NotificationsButton onClick={() => setIsNotificationOpen(true)}>
              <IoMdNotifications />
            </s.NotificationsButton>
          </div>
          {personState ? (
            <s.UserDetails onClick={handleUsers}>
              <s.UserInitials>{initials}</s.UserInitials>
              <div className="max-sm:hidden ">
                <s.UserInfo>
                  <s.UserName>{personState.name}</s.UserName>
                  <s.UserPermission
                    color={getPermissionColor(personState.permission)}
                  >
                    {personState.permission}
                  </s.UserPermission>
                </s.UserInfo>
              </div>
            </s.UserDetails>
          ) : (
            <s.UserPlaceholder>Usuário</s.UserPlaceholder>
          )}
        </s.UserInfoContainer>

        {isNotificationOpen && (
          <s.NotificationModal>
            <s.NotificationHeader>
              <h2>Notificações</h2>
              <s.CloseButton onClick={() => setIsNotificationOpen(false)}>
                <IoIosClose />
              </s.CloseButton>
            </s.NotificationHeader>
            <s.NotificationContent>
              {renderizarNotificacoes()}
            </s.NotificationContent>
          </s.NotificationModal>
        )}

        <s.SidebarContainer
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
        >
          <IoMdClose
            className="w-7 h-7 ml-[240px] "
            onClick={() => setIsSidebarOpen(false)}
          />
          <div>
            <s.MenuList>
              <s.MenuItem onClick={() => handleButtonClick("dashboard")}>
                Dashboard
                <RiDashboardHorizontalFill />
              </s.MenuItem>
              <s.MenuItem onClick={() => handleButtonClick("conformidades")}>
                Não Conformidades
                <AiFillDashboard />
              </s.MenuItem>
              {PermView ? (
                <></>
              ) : (
                <>
                  <s.MenuItem
                    onClick={() => handleButtonClick("departamentos")}
                  >
                    Departamentos
                    <IoIosGitNetwork />
                  </s.MenuItem>
                  <s.MenuItem onClick={() => handleButtonClick("users")}>
                    Usuários
                    <PiUsersLight />
                  </s.MenuItem>
                </>
              )}
            </s.MenuList>
          </div>

          <s.FooterButtonMob onClick={handleLogout} select="not">
            <MdLogout />
            Sair
          </s.FooterButtonMob>
        </s.SidebarContainer>
      </s.HeaderContainer>

      <s.MainContent>
        <s.GeralContainer isOn={isDarkMode}>
          <s.ButtonContainer>
            <s.StyledButton
              active={activeButton === "dashboard"}
              onClick={() => handleButtonClick("dashboard")}
            >
              <RiDashboardHorizontalFill />
              Dashboard
            </s.StyledButton>
            <s.StyledButton
              active={activeButton === "conformidades"}
              onClick={() => handleButtonClick("conformidades")}
            >
              <AiFillDashboard />
              Não Conformidades
            </s.StyledButton>
            {PermView ? (
              <></>
            ) : (
              <>
                <s.StyledButton
                  active={activeButton === "departamentos"}
                  onClick={() => handleButtonClick("departamentos")}
                >
                  <IoIosGitNetwork />
                  Departamentos
                </s.StyledButton>
                <s.StyledButton
                  active={activeButton === "users"}
                  onClick={() => handleButtonClick("users")}
                >
                  <PiUsersLight />
                  Usuários
                </s.StyledButton>
              </>
            )}
          </s.ButtonContainer>

          <s.Footer>
            <s.FooterText>
              Todos os direitos reservados à <br /> Fundação de Saúde Parreiras
              Horta © 2024.
            </s.FooterText>
            <s.Divider />
            <s.FooterButton onClick={handleLogout} select="not">
              <MdLogout />
              Sair
            </s.FooterButton>
          </s.Footer>
        </s.GeralContainer>
      </s.MainContent>
    </s.Layout>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
