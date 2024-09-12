import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithAuth } from "../../utils/helpers";
import { FileInterface, Wish } from "./interfaces";

export class WishDAOService {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }

    public async wishCreate(wishData: Wish, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/wishes/`, {
            method: 'POST',
            body: JSON.stringify(wishData),
            headers: {
              "Content-Type": "application/json",
            }
          }, authContext)
        return response;
    }

    public async wishUpdate(wishData: Wish, wishId: string, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/wishes/${wishId}/`, {
            method: 'PATCH',
            body: JSON.stringify(wishData),
            headers: {
              "Content-Type": "application/json",
            }
          }, authContext)
        return response;
    }

    public async wishPhotoUpdate(formData: FormData, wishId: string, authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/wish/wishes/${wishId}/`, {
        method: 'PATCH',
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }, authContext)
      return response;
    }

    public async wishVideoUpdate(data: FormData, wishId: string, authContext: any): Promise<Response> {
      try {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/video/${wishId}/`, {
          method: 'PUT',
          body: data,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }, authContext)
        return response;
      }
      catch (error) {
        console.log(error)
        throw new Error();
      }
    }

    public async getWish(wishId: string, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/wish/all-wishes/${wishId}/`, {}, authContext)
        return response;
    }

    public async getMyWishes(urlParams: URLSearchParams, authContext: any, url?: string): Promise<Response> {
      const response = await fetchWithAuth((url ? url : `${this.apiUrl}/api/wish/wishes/?`) + urlParams, {}, authContext)
      return response;
    }

    public async getWishes(urlParams: URLSearchParams, authContext: any, url?: string): Promise<Response> {
      const response = await fetchWithAuth((url ? url : `${this.apiUrl}/api/wish/all-wishes/?`) + urlParams, {}, authContext)
      return response;
    }

    public async getArticleWishes(slug: string, authContext: any, url?: string): Promise<Response> {
      const response = await fetchWithAuth((url ? url : `${this.apiUrl}/api/news/${slug}/wish/`), {}, authContext)
      return response;
    }

    public async cutVideo(videoBase64: string, start: number, end: number): Promise<Response> {
      const response = await fetch(`${this.apiUrl}/api/video/cut/`, {
        method: "POST",
        headers: {
          "ContentType": "application/json"
        },
        body: JSON.stringify({
          video_file: videoBase64,
          start: start,
          end: end
        })
      })
      return response;
    }
}
  