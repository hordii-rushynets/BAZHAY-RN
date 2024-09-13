import { WishDAOService } from "./dao-services"
import { FileInterface, Wish } from "./interfaces";
import config from "../../config.json"
import { blobToBase64, getBlobFromUri } from "../../utils/helpers";

export class WishService {
    private daoService: WishDAOService;

    constructor() {
        this.daoService = new WishDAOService(config.apiUrl || "");
    }

    public async wishCreate(wishData: Wish, authContext: any):Promise<Wish> {
        const response = await this.daoService.wishCreate(wishData, authContext);
        if (response.ok) {
            const wishData = await response.json(); 
            return wishData;
        }
        else {
            throw new Error("Error fetching userinfo");
        }
    }

    public async wishUpdate(wishData: Wish, wishId: string, authContext: any):Promise<boolean> {
        const response = await this.daoService.wishUpdate(wishData, wishId, authContext);
        return response.ok
    }

    public async wishPhotoUpdate(photoUri: string, name: string, scaling: {width: number, height: number}, wishId: string, authContext: any): Promise<boolean> {
        const photoBlob = await getBlobFromUri(photoUri);

        const formData = new FormData();
        formData.append("photo", { name: `${name.split(".")[0]}_${Date.now()}.` + photoBlob.type.split("/")[1], type: photoBlob.type, uri: photoUri } as any);
        formData.append("image_size", `${scaling.width/scaling.height}`)

        const response = await this.daoService.wishPhotoUpdate(formData, wishId, authContext);
        return response.ok
    }

    public async wishVideoUpdate(video: FileInterface, startTime: number, endTime: number, wishId: string, authContext: any): Promise<boolean> {
        const formData = new FormData();
        formData.append("video", { name: video.name, type: video.type, uri: video.uri } as any);
        formData.append("start", `${startTime}`);
        formData.append("end", `${endTime}`);

        const response = await this.daoService.wishVideoUpdate(formData, wishId, authContext);
        return response.ok
    }

    public async getWish(wishId: string, authContext: any):Promise<Wish> {
        const response = await this.daoService.getWish(wishId, authContext);

        if (response.ok) {
            const wishData = await response.json(); 
            return wishData;
        }
        else {
            throw new Error("Error fetching wishinfo");
        }
    }

    public async getMyWishes(queryParams: {[key: string]: string}, authContext: any, url?: string):Promise<{count: number; next?: string; previous?:string; results: Wish[]}> {
        const urlParams = new URLSearchParams(queryParams);

        const response = await this.daoService.getMyWishes(url ? new URLSearchParams() : urlParams, authContext, url);

        if (response.ok) {
            const allData = await response.json(); 
            return allData;
        }
        else {
            throw new Error("Error fetching wishinfo");
        }
    }

    public async getWishes(queryParams: {[key: string]: string}, authContext: any, url?: string):Promise<{count: number; next?: string; previous?:string; results: Wish[]}> {
        const urlParams = new URLSearchParams(queryParams);

        const response = await this.daoService.getWishes(url ? new URLSearchParams() : urlParams, authContext, url);

        if (response.ok) {
            const allData = await response.json(); 
            return allData;
        }
        else {
            throw new Error("Error fetching wishinfo");
        }
    }

    public async getArticleWishes(slug: string, authContext: any, url?: string):Promise<{count: number; next?: string; previous?:string; results: Wish[]}> {
        const response = await this.daoService.getArticleWishes(slug, authContext, url);

        if (response.ok) {
            const allData = await response.json(); 
            return allData;
        }
        else {
            throw new Error("Error fetching wishinfo");
        }
    }

    public async cutVideo(videoUri: string, start: number, end: number): Promise<string> {
        const videoBlob = await getBlobFromUri(videoUri);
        const videoBase64 = await blobToBase64(videoBlob);

        const response = await this.daoService.cutVideo(videoBase64, start, end);

        if (response.ok) {
            const cuttedVideo = await response.json();
            return cuttedVideo;
        }
        else {
            throw new Error("Error cutting the video");
        }
    }
}
