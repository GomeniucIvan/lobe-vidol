import {DownloadItem, HubDownloadItem} from "@/types/hub";

export type ModelDownloadMap = Record<string, HubDownloadItem>;

export interface HubState {
  modelList: DownloadItem[];
  modelMap: ModelDownloadMap;
  currentIdentifier: string;
  searchKeywords: string;
  tagList: string[];
}

export const initialState: HubState = {
  modelList: [],
  modelMap: {},
  currentIdentifier: '',
  searchKeywords: '',
  tagList: [],
};
