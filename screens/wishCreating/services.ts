import { WishDAOService } from "./dao-services"
import { FileInterface, Wish } from "./interfaces";
import config from "../../config.json"
import { blobToBase64, getBlobFromUri } from "../../utils/helpers";
import * as FileSystem from 'expo-file-system';

const tempDir = FileSystem.cacheDirectory as string;

export class WishService {
    private daoService: WishDAOService;

    constructor() {
        this.daoService = new WishDAOService(config.apiUrl || "");
    }

    public async wishCreate(wishData: Wish, authContext: any):Promise<Wish> {
        let localPhotoUri = "";
        let localVideoUri = "";
        const localPhotoName = `${Date.now()}_copy_${wishData.photo?.split("/").at(-1)}`;
        const localVideoName = `${Date.now()}_copy_${wishData.video?.split("/").at(-1)}`;
        if (wishData.photo) {
            const downloadPhotoResult = await FileSystem.downloadAsync(
                wishData.photo,
                tempDir + localPhotoName
            );
            localPhotoUri = downloadPhotoResult.uri;
        }
        if (wishData.video) {
            const downloadVideoResult = await FileSystem.downloadAsync(
                wishData.video,
                tempDir + localVideoName
            );
            localVideoUri = downloadVideoResult.uri;
        }

        const formData = new FormData();
        if (localPhotoUri) {
            formData.append("photo", {
                uri: localPhotoUri,
                name: localPhotoName,
                type: `image/${localPhotoName.split(".").at(-1)}`,
            } as any);
        }
        if (localVideoUri) {
            formData.append("video", {
                uri: localVideoUri,
                name: localVideoName,
                type: `video/${localVideoName.split(".").at(-1)}`,
            } as any);
        }
        
        formData.append("name", wishData.name || "");
        formData.append("description", wishData.description || "");
        formData.append("link", wishData.link || "");
        formData.append("price", wishData.price?.toString() || "");
        formData.append("currency", wishData.currency || "");
        formData.append("image_size", wishData.image_size?.toString() || "");

        const response = await this.daoService.wishCreate(formData, authContext);
        if (response.ok) {
            if (localPhotoUri) {
                await FileSystem.deleteAsync(localPhotoUri);
            }
            if (localVideoUri) {
                await FileSystem.deleteAsync(localVideoUri);
            }
            const wishData = await response.json(); 
            return wishData;
        }
        else {
            throw new Error("Error fetching userinfo");
        }
    }

    public async getWishByLink(link: string, authContext: any): Promise<Wish> {
        const response = await this.daoService.getWishByLink(link, authContext);
        if (response.ok) {
            const wishData = await response.json(); 
            return wishData;
        }
        else {
            throw new Error("Error fetching wishinfo");
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

    public async getMyWish(wishId: string, authContext: any):Promise<Wish> {
        const response = await this.daoService.getMyWish(wishId, authContext);

        if (response.ok) {
            const wishData = await response.json(); 
            return wishData;
        }
        else {
            throw new Error("Error fetching wishinfo");
        }
    }

    public async deleteWish(wishId: string, authContext: any):Promise<boolean> {
        const response = await this.daoService.deleteWish(wishId, authContext);
        return response.ok;
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
