import Constants from 'expo-constants';
import { WishDAOService } from "./dao-services"
import { Wish } from "./interfaces";

export class WishService {
    private daoService: WishDAOService;

    constructor() {
        this.daoService = new WishDAOService(Constants.manifest2.extra.expoClient.extra.apiUrl || "");
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

    public async getMyWishes(queryParams: {[key: string]: string}, authContext: any):Promise<Wish[]> {
        const urlParams = new URLSearchParams(queryParams);

        const response = await this.daoService.getMyWishes(urlParams, authContext);

        if (response.ok) {
            const allData = await response.json(); 
            const wishData = allData.results;
            return wishData;
        }
        else {
            throw new Error("Error fetching wishinfo");
        }
    }
}
