import { color } from "@styles/colors";
import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    ${color("SystemBackground")} 35%,
    rgba(48, 66, 97, 1) 100%
  );
`;
