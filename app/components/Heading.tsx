import styled from 'styled-components';
import {
  Heading as PancakeHeading,
  HeadingProps as PancakeHeadingProps
} from '@pancakeswap-libs/uikit'

export type Scales = typeof scales[keyof typeof scales];

export const scales = {
  MD: "md",
  LG: "lg",
  XL: "xl",
  XXL: "xxl",
} as const;

interface HeadingProps extends PancakeHeadingProps {
  scale?: Scales
}

const style = {
  [scales.MD]: {
    fontSize: "20px",
    fontSizeLg: "20px",
  },
  [scales.LG]: {
    fontSize: "24px",
    fontSizeLg: "24px",
  },
  [scales.XL]: {
    fontSize: "32px",
    fontSizeLg: "40px",
  },
  [scales.XXL]: {
    fontSize: "48px",
    fontSizeLg: "64px",
  },
};

export const Heading = styled(PancakeHeading) <HeadingProps>`
  font-size: ${({ scale }) => style[scale || scales.MD].fontSize};

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ scale }) => style[scale || scales.MD].fontSizeLg};
  }
`;
