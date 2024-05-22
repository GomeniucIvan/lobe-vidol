import {HubModelIndex} from "@/types/hub";
import {ServerConfig} from "@/types/config";
import {createHeader} from "@/store/config/selectors/config";

class HubService {
  getModelList = async (config: ServerConfig): Promise<HubModelIndex> => {
    const res = await fetch(`${config?.endpoint}download/list`, {
      headers: createHeader(),
      method: 'GET',
    });

    return res.json();
  };
}
export const hubService = new HubService();
