import {HubDownloadItem} from "@/types/hub";

export const DEFAULT_DOWNLOAD_ITEM: HubDownloadItem = {
  model: '',
  createAt: Date.now().toString(),
  homepage: '',
  identifier: '',
  manifest: '',
  meta: null
};
