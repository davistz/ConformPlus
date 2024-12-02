import styled from "styled-components";

export const DividerMain = styled.div`
  border-bottom: 1px solid
    ${(props) => (props.isDarkMode ? "#4b5563" : "#d1d5db")};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-left: -3rem;
  }
`;
