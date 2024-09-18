import { fetchWithAuth } from "../../utils/helpers";
import { userType } from "./interfaces";

export class MainDAOService {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }

    public async getNews(authContext: any):Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/news/`, {}, authContext);
        return response;
    }

    public async getBrands(authContext: any):Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/brand/`, {}, authContext);
      return response;
    }

    public async getArticle(slug: string, authContext: any):Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/news/${slug}/`, {}, authContext);
      return response;
  }

  public async getBrand(slug: string, authContext: any):Promise<Response> {
    const response = await fetchWithAuth(`${this.apiUrl}/api/brand/${slug}/`, {}, authContext);
    return response;
  }

  public async getSubscription(userType: userType, authContext: any, link?: string): Promise<Response> {
    const response = await fetchWithAuth(link ? link : `${this.apiUrl}/api/subscription/${userType}/`, {}, authContext);
    return response;
  }

  public async subscribe(userId: string, authContext: any): Promise<Response> {
    const response = await fetchWithAuth(`${this.apiUrl}/api/subscription/subscribe/`, {
      method: "POST",
      body: JSON.stringify({
        subscribed_to_id: userId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }, authContext);
    return response;
  }

  public async unsubscribe(userId: string, authContext: any): Promise<Response> {
    const response = await fetchWithAuth(`${this.apiUrl}/api/subscription/unsubscribe/`, {
      method: "DELETE",
      body: JSON.stringify({
        subscribed_to_id: userId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }, authContext);
    return response;
  }
}
  