import * as s from "./Login.styled";

const RecuperarSenha = () => {
  return;
  <s.AuthContainer>
    <s.FormContainerSenha>
      <s.Title>Recuperar Senha</s.Title>
      <s.InputContainerSenha>
        <s.Label>Digite seu E-mail de Recuperação</s.Label>
        <s.StyledInput type="email" placeholder="E-mail de recuperação" />
      </s.InputContainerSenha>
      <s.ButtonWrapper>
        <s.StyledButton select="btn" onClick="{handleSenhaNova}">
          Enviar Link de Redefinição
        </s.StyledButton>
      </s.ButtonWrapper>
    </s.FormContainerSenha>
    <s.SwitchAuthLink onClick="{handleSenhaOn}">
      Já possui login? Clique Aqui!
    </s.SwitchAuthLink>
  </s.AuthContainer>;
};

export default RecuperarSenha;
