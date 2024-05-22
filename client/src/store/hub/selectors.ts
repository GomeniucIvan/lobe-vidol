import {HubStore} from "@/store/hub/index";
import {HubDownloadItem} from "@/types/hub";
import {DEFAULT_DOWNLOAD_ITEM} from "@/constants/downloadItem";

const getModelList = (s: HubStore) => {
  const { searchKeywords, modelList } = s;
  if (!searchKeywords) return modelList;

  //todo
  return modelList;


  // return modelList.filter(({ meta }) => {
  //   const checkMeta: string = [meta.tags, meta.title, meta.description, meta.avatar]
  //     .filter(Boolean)
  //     .join('');
  //   return checkMeta.toLowerCase().includes(searchKeywords.toLowerCase());
  // });
};
const getModelTagList = (s: HubStore) => s.tagList;

const getModelItemById = (d: string) => (s: HubStore) => s.modelMap[d];

const currentModelItem = (s: HubStore) => getModelItemById(s.currentIdentifier)(s);

const currentAgentItemSafe = (s: HubStore): HubDownloadItem => {
  const item = getModelItemById(s.currentIdentifier)(s);
  if (!item) return DEFAULT_DOWNLOAD_ITEM;

  return item;
};

const showSideBar = (s: HubStore) => !!s.currentIdentifier;

export const hubSelectors = {
  currentModelItem,
  currentAgentItemSafe,
  getModelItemById,
  getModelList,
  getModelTagList,
  showSideBar,
};
