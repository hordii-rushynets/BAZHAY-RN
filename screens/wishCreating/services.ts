import { WishDAOService } from "./dao-services"
import { Wish } from "./interfaces";
import config from "../../config.json"

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

    public async wishPhotoUpdate(photo: string, wishId: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.wishPhotoUpdate(photo, wishId, authContext);
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
}
