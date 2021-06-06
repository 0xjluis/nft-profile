import styled from 'styled-components';
import { Card as PancakCard } from '@pancakeswap-libs/uikit'
import { color, ColorProps, border, BorderProps, typography, TypographyProps } from 'styled-system';

interface CardProps extends ColorProps, BorderProps, TypographyProps { }

export const Card = styled(PancakCard) <CardProps>`
  border-radius: 10px;

  ${typography}
  ${color}
  ${border}
`;
