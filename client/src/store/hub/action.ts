import {StateCreator} from "zustand/vanilla";
import {HubModelIndex} from "@/types/hub";
import {HubStore} from "@/store/hub/index";
import useSWR, {SWRResponse} from "swr";
import {hubService} from "@/services/hub";
import {globalHelpers} from "@/store/helper";

export interface StoreAction {
  setSearchKeywords: (keywords: string) => void;
  useFetchModelList: () => SWRResponse<HubModelIndex>;
}

export const createHubAction: StateCreator<
  HubStore,
  [['zustand/devtools', never]],
  [],
  StoreAction
> = (set, get) => ({
  // activateAgent: (identifier) => {
  //   set({ currentIdentifier: identifier });
  // },
  // deactivateAgent: () => {
  //   set({ currentIdentifier: '' }, false, 'deactivateAgent');
  // },
  setSearchKeywords: (keywords) => {
    set({ searchKeywords: keywords });
  },
  // updateAgentMap: (key, value) => {
  //   const { agentMap } = get();
  //
  //   const nextAgentMap = produce(agentMap, (draft) => {
  //     draft[key] = value;
  //   });
  //
  //   if (isEqual(nextAgentMap, agentMap)) return;
  //
  //   set({ agentMap: nextAgentMap }, false, `setAgentMap/${key}`);
  // },
  // useFetchAgent: (identifier) =>
  //   useSWR<AgentsMarketItem>(
  //     [identifier, globalHelpers.getCurrentLanguage()],
  //     ([id, locale]) => marketService.getAgentManifest(id, locale as string),
  //     {
  //       onError: () => {
  //         get().deactivateAgent();
  //       },
  //       onSuccess: (data) => {
  //         get().updateAgentMap(identifier, data);
  //       },
  //     },
  //   ),
  useFetchModelList: () =>
    useSWR<HubModelIndex>(
      globalHelpers.config,
      hubService.getModelList,
      {
        onSuccess: (hubIndex) => {
          set(
            { modelList: hubIndex.models, tagList: hubIndex.tags },
            false,
            'useFetchAgentList',
          );
        },
      },
    ),
});
