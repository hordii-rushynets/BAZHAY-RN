import Constants from 'expo-constants';
import { AccountDAOService } from "./dao-services"
import { UserFields } from "./interfaces";
import config from "../../config.json"
import { getBlobFromUri } from '../../utils/helpers';

export class AccountService {
    private daoService: AccountDAOService;

    constructor() {
        this.daoService = new AccountDAOService(config.apiUrl || "");
    }

    public async refreshToken(refreshToken: string): Promise<{access: string }> {
        const response = await this.daoService.refreshToken(refreshToken);
        if (response.ok) {
            const token = await response.json();
            return token;
        }
        return {access: "1" }
    }

    public async authenticate(email: string): Promise<boolean> {
        const response = await this.daoService.authenticate(email);
        return response.ok;
    }

    public async otpConfirm(email: string, otp: string): Promise<{access: string, refresh: string}> {
        const response = await this.daoService.otpConfirm(email, otp);
        if (response.ok) {
            const token = await response.json();
            return token;
        }
        return { access: "", refresh: "" };
    }

    public async authGuest(imei: string): Promise<{access: string, refresh: string}> {
        const response = await this.daoService.authGuest(imei);
        if (response.ok) {
            const tokens = await response.json();
            return tokens;
        }
        else {
            return { access: "", refresh: "" };
        }
    }

    public async userUpdate(userData: UserFields, authContext: any):Promise<boolean> {
        const response = await this.daoService.userUpdate(userData, authContext);
        return response.ok
    }

    public async userPhotoUpdate(photoUri: string, authContext: any): Promise<boolean> {
        const photoBlob = await getBlobFromUri(photoUri);

        const formData = new FormData();
        formData.append("photo", { name: "user_avatar." + photoBlob.type.split("/")[1], type: photoBlob.type, uri: photoUri } as any);

        const response = await this.daoService.userPhotoUpdate(formData, authContext);
        return response.ok
    }

    public async getUser(authContext: any):Promise<UserFields> {
        const response = await this.daoService.getUser(authContext);

        if (response.ok) {
            const userData = await response.json(); 
            return userData;
        }
        else {
            throw new Error("Error fetching userinfo");
        }
    }
}
