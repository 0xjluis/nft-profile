import { FC } from 'react';
import { ConnectorNames } from '@/utils/web3React'

import { SvgProps } from '@/assets/icon/Svg';

export type Login = (connectorId: ConnectorNames) => void;
export type Logout = () => void;

export interface WalletConfig {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorNames;
}
