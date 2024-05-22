import {HubModelIndex} from "@/types/hub";
import {ServerConfig} from "@/types/config";

class HubService {
  getModelList = async (config: ServerConfig): Promise<HubModelIndex> => {
    const res = await fetch(`${config?.endpoint}download/list`);

    return res.json();
  };
}
export const hubService = new HubService();
