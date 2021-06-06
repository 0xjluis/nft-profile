import { HTMLAttributes } from "react";
import styled from "styled-components";
import {
  background, border, layout, position, space,
  BackgroundProps, BorderProps, LayoutProps, PositionProps, SpaceProps
} from "styled-system";

export interface BoxProps
  extends BackgroundProps,
  BorderProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  HTMLAttributes<HTMLDivElement> { }

export const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
`;
