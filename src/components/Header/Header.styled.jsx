import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #164095;
  padding: 1.25rem; /* py-5 */
  width: 100%; /* O cabeçalho ocupa toda a largura */
  position: fixed; /* Mantém o cabeçalho fixo no topo */
  z-index: 100; /* Certifica-se de que o cabeçalho está acima de outros elementos */
`;

export const Layout = styled.div`
  display: flex;
  height: 100vh; /* Faz com que o layout ocupe a altura total da viewport */
`;

export const Logo = styled.img`
  width: 120px; /* ajuste conforme necessário */
  cursor: pointer;

  @media (min-width: 640px) {
    width: 150px;
  }
  @media (min-width: 768px) {
    width: 250px;
  }
  @media (min-width: 1024px) {
    width: 330px;
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

  /* Ocultar o conteúdo quando a largura da tela for <= 768px */
  @media (max-width: 1024px) {
    display: none; /* Oculta o conteúdo */
  }
`;
export const SidebarContainer = styled.div`
  position: fixed;
  margin-top: 2rem;
  top: 0;
  left: 0;
  background-color: #164095;
  color: white;
  width: 360px;
  height: 100%;
  z-index: 50;
  transform: translateX(${(props) => (props.isSidebarOpen ? "0" : "-100%")});
  transition: transform 0.3s ease-in-out;

  /* Oculta o sidebar em telas menores ou iguais a 755px */
  @media (min-width: 1025px) {
    display: none; /* Esconde quando inativo */
    width: 100%; /* Largura total para telas menores */
    transform: none; /* Mostra o sidebar */
  }
`;
export const CloseSidebarButton = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem; /* w-6 */
  height: 1.5rem; /* h-6 */
  cursor: pointer;
  background-color: red; /* bg-red-600 */
`;

export const MenuItem = styled.li`
  width: 100%; /* w-full */
  font-size: 20px;
  color: ${({ active }) =>
    active ? "#082d76" : "white"}; /* Mudança da cor do texto */
  font-weight: ${({ active }) =>
    active ? "600" : "400"}; /* Mudança do peso da fonte */
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-left: 2rem;

  background-color: ${({ active }) =>
    active ? "white" : "transparent"}; /* Alterando o fundo */
  border: none; /* Sem borda padrão */
  cursor: pointer;
  transition: background-color 0.3s; /* Efeito de transição suave */

  /* Adicionando a borda à esquerda quando ativo */
  border-left: ${({ active }) =>
    active ? "7px solid white" : "none"}; /* Borda à esquerda */
  padding-left: ${({ active }) =>
    active ? "1rem" : "0.7rem"}; /* Adiciona espaço à esquerda quando ativo */

  & > svg {
    margin-right: 1rem; /* Espaçamento entre o ícone e o texto */
  }
`;

export const MenuList = styled.ul`
  flex-direction: column;
`;

export const GeralContainer = styled.div`
  background-color: #164095;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* h-screen */
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1.75rem;
  padding-left: 1rem;
  font-weight: bold;
`;

export const Footer = styled.div`
  margin-top: auto; /* mt-auto */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const FooterText = styled.p`
  color: #ebebeb;
  font-size: 10px;
  margin-bottom: 0.5rem; /* mb-2 */
  font-weight: 100; /* font-thin */
`;

export const Divider = styled.div`
  border-color: gray; /* border-gray-50 */
  width: 100%;
  border-bottom-width: 2px; /* border-b-2 */
`;

export const StyledButton = styled.button`
  width: 100%; /* w-full */
  font-size: 20px;
  color: ${({ active }) =>
    active ? "#082d76" : "white"}; /* Mudança da cor do texto */
  font-weight: 600;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  background-color: ${({ active }) =>
    active ? "white" : "transparent"}; /* Alterando o fundo */
  border: none; /* Sem borda padrão */
  cursor: pointer;
  transition: background-color 0.3s; /* Efeito de transição suave */

  /* Adicionando a borda à esquerda quando ativo */
  border-left: ${({ active }) =>
    active ? "7px solid white" : "none"}; /* Borda à esquerda */
  padding-left: ${({ active }) =>
    active ? "1rem" : "0.7rem"}; /* Adiciona espaço à esquerda quando ativo */

  & > svg {
    margin-right: 1rem; /* Espaçamento entre o ícone e o texto */
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 1.25rem; /* mr-5 */
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
  margin-right: 1rem; /* mr-2 */
`;

export const UserName = styled.p`
  font-size: 24px;
  font-weight: 500; /* font-medium */
  color: white;
`;
export const FooterButton = styled.button`
  width: 100%; /* w-full */
  font-size: 20px;
  color: white;
  font-weight: 400;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  margin-left: 3rem;
  margin-top: 1rem;
  border: none; /* Sem borda padrão */
  cursor: pointer;
  transition: background-color 0.3s; /* Efeito de transição suave */

  & > svg {
    margin-right: 1rem;
  }
`;

export const UserPermission = styled.div`
  color: ${({ color }) => color || "#bebebe"};
  // Outros estilos para UserPermission
`;

export const UserPlaceholder = styled.p`
  color: white;
`;

export const NotificationModal = styled.div`
  position: fixed;
  top: 20px; /* Distância do topo da tela */
  right: 20px; /* Distância da borda direita da tela */
  background-color: #0e285b; /* Cor de fundo */
  border-radius: 20px; /* Arredondar bordas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px; /* Ajuste a largura conforme necessário */
  z-index: 1000; /* Coloca o modal acima de outros elementos */
  max-height: 80vh;
  overflow-y: auto;
`;

export const NotificationHeader = styled.div`
  display: flex; /* Usado para alinhar itens em linha */
  justify-content: space-between; /* Espaço entre o título e o botão de fechar */
  align-items: center; /* Centraliza verticalmente os itens */
  padding-top: 20px; /* Espaçamento interno */
  padding-left: 20px; /* Espaçamento interno */
  background-color: #0e285b; /* Cor de fundo */
  border-radius: 20px 20px 0 0; /* Arredonda apenas o topo */
  color: white; /* Cor do texto */
  font-size: 1.5rem; /* Tamanho da fonte */
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 10px;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 40px; /* Ajuste conforme necessário */
`;

export const NotificationContent = styled.div`
  margin-top: 20px;
`;
