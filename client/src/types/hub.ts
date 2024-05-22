import {MetaData} from "@/types/meta";

export interface DownloadItem {
  model: string;
  createAt: string;
  homepage: string;
  identifier: string;
  meta: MetaData;
  manifest: string;
}

export type HubDownloadItem = DownloadItem;

export interface HubModelIndex {
  models: DownloadItem[];
  tags: string[];
}
