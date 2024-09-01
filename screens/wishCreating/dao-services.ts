import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithAuth } from "../../utils/helpers";
import { Wish } from "./interfaces";

export class WishDAOService {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }

    public async wishCreate(wishData: Wish, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/`, {
            method: 'POST',
            body: JSON.stringify(wishData),
            headers: {
              "Content-Type": "application/json",
            }
          }, authContext)
        return response;
    }

    public async wishUpdate(wishData: Wish, wishId: string, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/${wishId}/`, {
            method: 'PATCH',
            body: JSON.stringify(wishData),
            headers: {
              "Content-Type": "application/json",
            }
          }, authContext)
        return response;
    }

    public async wishPhotoUpdate(photo: string, wishId: string, authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/wish/${wishId}/`, {
        method: 'PATCH',
        body: JSON.stringify({
            "media": photo
        }),
        headers: {
        }
      }, authContext)
      return response;
    }

    public async getWish(wishId: string, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/${wishId}/`, {}, authContext)
        return response;
    }

    public async getMyWishes(urlParams: URLSearchParams, authContext: any, url?: string): Promise<Response> {
      const response = await fetchWithAuth((url ? url : `${this.apiUrl}/api/wish/?`) + urlParams, {}, authContext)
      return response;
    }
}
  