import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.isOn ? "#010102" : "#164095")};
  color: ${(props) => (props.isOn ? "#ffffff" : "#cccccc")};
  transition: background-color 0.3s ease;
  padding: 1.25rem;
  width: 100%;
  position: fixed;
  z-index: 100;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  padding-top: 2rem;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.isDarkMode ? "#000000ee" : "#164095f0"}; /* Ajuste de cores */
  width: 300px;
  height: 100%;
  z-index: 50;
  transform: translateX(${(props) => (props.isSidebarOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  @media (min-width: 1025px) {
    display: none;
    width: 100%;
    transform: none;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isOn ? "flex-end" : "flex-start")};
  width: 50px;
  height: 25px;
  background-color: ${(props) => (props.isOn ? "#646464" : "#ccc")};
  border-radius: 25px;
  padding: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const SwitchCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOn ? "translateX(26px)" : "translateX(0)")};
`;

export const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

export const Logo = styled.img`
  margin-left: 1rem;
  width: 120px;
  cursor: pointer;

  @media (min-width: 640px) {
    width: 150px;
  }
  @media (min-width: 768px) {
    width: 250px;
  }
  @media (min-width: 1024px) {
    width: 306px;
  }
`;

export const NotificationsButton = styled.div`
  color: white;
  font-size: 40px;
  margin-right: 1rem;
  cursor: pointer;
`;
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.div`
  margin-top: 70px;
  flex: 1;
  padding-top: 46px;
  background-color: #f0f0f0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const CloseSidebarButton = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  background-color: red;
`;

export const MenuItem = styled.li`
  width: 100%;
  font-size: 20px;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-left: 2rem;

  background-color: ${({ active }) => (active ? "white" : "transparent")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  border-left: ${({ active }) => (active ? "7px solid white" : "none")};
  padding-left: ${({ active }) => (active ? "1rem" : "0.7rem")};
  & > svg {
    margin-right: 1rem;
  }
`;

export const MenuList = styled.ul`
  flex-direction: column;
`;

export const GeralContainer = styled.div`
  background-color: ${(props) => (props.isOn ? "#010102" : "#164095")};
  transition: background-color 0.3s ease;
  width: 325px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1.75rem;
  padding-left: 1rem;
  font-weight: bold;
`;

export const Footer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const FooterText = styled.p`
  color: #ebebeb;
  font-size: 10px;
  margin-bottom: 0.5rem;
  font-weight: 100;
`;

export const Divider = styled.div`
  border-color: gray;
  width: 100%;
  border-bottom-width: 2px;
`;

export const StyledButton = styled.button`
  width: 100%;
  font-size: 20px;
  color: ${({ active }) => (active ? "#082d76" : "white")};
  font-weight: 600;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  background-color: ${({ active }) => (active ? "white" : "transparent")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  border-left: ${({ active }) => (active ? "7px solid white" : "none")};
  padding-left: ${({ active }) => (active ? "1rem" : "0.7rem")};

  & > svg {
    margin-right: 1rem;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 1.25rem;

  @media (max-width: 480px) {
    margin-right: -1rem;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  margin-right: 30px;
  align-items: center;
  cursor: pointer;
`;

export const UserInitials = styled.div`
  font-size: 30px;
  background-color: #0e5eba;
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const UserName = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: white;
`;
export const FooterButton = styled.button`
  width: 100%;
  font-size: 20px;
  color: white;
  font-weight: 400;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  margin-left: 3rem;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  & > svg {
    margin-right: 1rem;
  }
`;
export const FooterButtonMob = styled.button`
  width: 100%;
  font-size: 20px;
  color: white;
  font-weight: 600;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  margin-left: 2rem;
  margin-top: 25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  & > svg {
    margin-right: 1rem;
  }
`;

export const UserPermission = styled.div`
  color: ${({ color }) => color || "#bebebe"};
`;

export const UserPlaceholder = styled.p`
  color: white;
`;

export const NotificationModal = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #0e285b;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-left: 20px;
  background-color: #0e285b;
  border-radius: 20px 20px 0 0;
  color: white;
  font-size: 1.5rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 40px;
`;

export const NotificationContent = styled.div`
  margin-top: 20px;
`;
