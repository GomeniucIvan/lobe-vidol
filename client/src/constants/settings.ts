import { DEFAULT_USER_AVATAR } from '@/constants/common';
import { DEFAULT_PRIMARY_COLOR } from '@/constants/theme';
import { Config } from '@/types/config';

export const DEFAULT_SETTINGS: Config = {
  backgroundEffect: 'glow',
  serverConfig: {
    token: '',
    endpoint: '',
    model: 'openchat',
    imageModel: 'sdxl'
  },
  primaryColor: DEFAULT_PRIMARY_COLOR,
  avatar: DEFAULT_USER_AVATAR,
  nickName: '',
};
