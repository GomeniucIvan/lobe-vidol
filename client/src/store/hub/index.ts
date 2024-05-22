import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';
import {HubState, initialState} from "@/store/hub/initialState";
import {createHubAction, StoreAction} from "@/store/hub/action";
import { PersistOptions } from 'zustand/middleware';

export type HubStore = StoreAction & HubState;

const createStore: StateCreator<HubStore, [['zustand/devtools', never]]> = (...parameters) => ({
  ...initialState,
  ...createHubAction(...parameters),
});

const persistOptions: PersistOptions<HubStore> = {
  name: 'vidol-chat-hub-storage',

  skipHydration: true,
  //
  // storage: createHyperStorage({
  //   localStorage: {
  //     dbName: 'LobeHub',
  //     selectors: ['hubMap'],
  //   },
  //   url: {
  //     mode: 'search',
  //     selectors: [
  //       // map state key to storage key
  //       { currentIdentifier: 'hub' },
  //     ],
  //   },
  // }),

  version: 0,
};

export const useHubStore = createWithEqualityFn<HubStore>()(
  persist(
    devtools(createStore, {
      name: 'VIDOL_HUB_STORE',
    }),
    persistOptions,
  ),
  shallow,
);
