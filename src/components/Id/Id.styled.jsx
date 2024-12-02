import styled from "styled-components";

export const StyledId = styled.div`
  display: grid;
  grid-template-columns: 140px 210px 320px 150px 170px;
  gap: 0 2rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
  @media (min-width: 640px) {
    grid-template-columns: 140px 210px 320px 150px 170px;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 80px 120px 180px 90px 170px;
  }
  @media (min-width: 1280px) {
    grid-template-columns: 140px 140px 160px 220px 200px 140px;
  }
`;
