import { fetchWithAuth } from "../../utils/helpers";

export class HomeDAOService {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }

    public async getNotifications(authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/notifications/`, {}, authContext);
        return response;
    } 
}
  