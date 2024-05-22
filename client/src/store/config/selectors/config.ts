import { INITIAL_Z_INDEX } from '@/constants/token';
import {ConfigStore, useConfigStore} from '@/store/config';
import { ServerConfig, PanelKey } from '@/types/config';

const currentServerConfig = (s: ConfigStore): ServerConfig | undefined => {
  return s.config.serverConfig;
};

const getPanelZIndex = (s: ConfigStore, panelKey: PanelKey) => {
  const focusList = s.focusList;
  const index = focusList.indexOf(panelKey);
  return index === -1 ? INITIAL_Z_INDEX : INITIAL_Z_INDEX + index;
};

export const configSelectors = {
  currentServerConfig,
  getPanelZIndex,
};

export const createHeader = (header?: any) => {
  const config = configSelectors.currentServerConfig(useConfigStore.getState());
  return {
    'Content-Type': 'application/json',
    'Authorization': config?.token,
    ...header,
  };
};
