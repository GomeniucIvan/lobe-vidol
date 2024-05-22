import {configSelectors, useConfigStore} from "@/store/config";

const config = configSelectors.currentServerConfig(useConfigStore.getState());

export const globalHelpers = {
  config,
};
