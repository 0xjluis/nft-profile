import styled from "styled-components";
import { Button } from "./Button";

export const IconButton = styled(Button) <any>`
  padding: 0;
  width: ${({ scale }) => (scale === "sm" ? "32px" : "48px")};
`;
