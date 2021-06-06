import styled, { DefaultTheme } from 'styled-components';
import { space, typography, layout, LayoutProps, SpaceProps, TypographyProps } from 'styled-system';
import getThemeValue from '@/utils/getThemeValue';

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string;
  fontSize?: string;
  bold?: boolean;
}

interface ThemedProps extends TextProps {
  theme: DefaultTheme;
}

const getColor = ({ color, theme }: ThemedProps) => {
  return getThemeValue(`colors.${color}`)(theme);
};

export const Text = styled.div<TextProps>`
  color: ${getColor};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  line-height: 1.5;
  ${space}
  ${typography}
  ${layout}
`;

Text.defaultProps = {
  color: 'text',
  fontSize: '16px',
  bold: false
};
