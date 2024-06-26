import { Coordinates } from '@dnd-kit/utilities';
import { PrimaryColors } from '@lobehub/ui';

export type BackgroundEffect = 'glow' | 'none';

export interface Panel {
  /**
   * 坐标
   */
  coordinates: Coordinates;
  /**
   * 是否打开
   */
  open: boolean;
}

export interface PanelConfig {
  agent: Panel;
  dance: Panel;
  market: Panel;
  role: Panel;
}

export type PanelKey = keyof PanelConfig;

export interface CommonConfig {
  /**
   * 用户头像
   */
  avatar: string;
  /**
   * 背景类型
   */
  backgroundEffect: BackgroundEffect;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 主题色
   */
  primaryColor: PrimaryColors;
}

export interface ServerConfig {
  token?: string;
  endpoint?: string;
  model?: string;
  imageModel?: string;
}

export interface Config extends CommonConfig {
  serverConfig: ServerConfig;
}
