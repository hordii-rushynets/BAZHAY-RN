import { fetchWithAuth } from "../../utils/helpers";

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
}
  