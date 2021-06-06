import { SVGAttributes } from "react";
import styled, { DefaultTheme } from "styled-components";
import getThemeValue from "@/utils/getThemeValue";

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
  theme?: DefaultTheme;
}

export const Svg = styled.svg`
align-self: center; // Safari fix
fill: ${({ theme, color }) => getThemeValue(`colors.${color}`)(theme)};
flex-shrink: 0;
`;
