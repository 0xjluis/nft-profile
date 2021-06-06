import styled from 'styled-components';
import {
  color,
  size,
  SizeProps
} from 'styled-system';
import { Button as PancakeButton, ButtonProps as PancakeButtonProps } from '@pancakeswap-libs/uikit'

interface ButtonProps extends PancakeButtonProps, SizeProps { }

export const Button = styled(PancakeButton) <ButtonProps>`
  flex: 1 1;
  width: 100%;
  border-radius: 4px;
  font-family: inherit;
  font-size: 20px;
  height: 40px;
  border: 0;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .1s ease-in-out;
  outline: 0;
  cursor: pointer;
  padding: 10px 20px;

  ${size}
  ${color}
`;
