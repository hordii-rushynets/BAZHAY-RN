import Constants from 'expo-constants';
import { AccountDAOService } from "./dao-services"
import { UserFields } from "./interfaces";

export class AccountService {
    private daoService: AccountDAOService;

    constructor() {
        this.daoService = new AccountDAOService(Constants.manifest2.extra.expoClient.extra.apiUrl || "");
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

    public async authGuest(): Promise<{access: string, refresh: string}> {
        const response = await this.daoService.authGuest();
        if (response.ok) {
            return response.json();
        }
        else {
            return { access: "", refresh: "" };
        }
    }

    public async userUpdate(userData: UserFields, authContext: any):Promise<boolean> {
        const response = await this.daoService.userUpdate(userData, authContext);
        return response.ok
    }

    public async userPhotoUpdate(photo: FormData, authContext: any): Promise<boolean> {
        const response = await this.daoService.userPhotoUpdate(photo, authContext);
        return response.ok
    }
}
