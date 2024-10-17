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

    public async buttonAction(request: {url: string, body: Object}, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}${request.url}`, JSON.stringify(request.body) !== `{"":""}` ? {
          method: "POST",
          body: JSON.stringify(request.body),
          headers: {
            "Content-Type": "application/json"
          }
        } : {}, authContext)

        return response;
    }
}
  