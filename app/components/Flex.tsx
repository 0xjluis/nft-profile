import styled from 'styled-components';
import { flexbox, FlexboxProps, layout, LayoutProps } from 'styled-system';
import { Box, BoxProps } from './Box';

interface FlexProps extends BoxProps, FlexboxProps, LayoutProps { }

export const Flex = styled(Box) <FlexProps>`
  display: flex;
  ${layout}
  ${flexbox}
`;
