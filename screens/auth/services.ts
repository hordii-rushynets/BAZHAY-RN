import { AccountDAOService } from "./dao-services"
import { Address, PaginatedUserFields, Post, Premium, UserFields } from "./interfaces";
import config from "../../config.json"
import { getBlobFromUri, removeEmptyFields } from '../../utils/helpers';

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

    public async otpConfirm(email: string, otp: string): Promise<{access: string, refresh: string, is_already_registered: boolean}> {
        const response = await this.daoService.otpConfirm(email, otp);
        if (response.ok) {
            const token = await response.json();
            return token;
        }
        return { access: "", refresh: "", is_already_registered: false };
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

    public async getUser(authContext: any, userId?: string):Promise<UserFields> {
        let response = new Response();

        if (userId) {
            response = await this.daoService.getUserById(userId, authContext);
        }
        else {
            response = await this.daoService.getUser(authContext);
        }

        if (response.ok) {
            const userData = await response.json(); 
            return userData;
        }
        else if (response.status === 403) {
            const userData = { haveErrors: true };
            return userData;
        }
        else {
            throw new Error("Error fetching userinfo");
        }
    }

    public async deleteUser(authContext: any): Promise<boolean> {
        const response = await this.daoService.deleteUser(authContext);
        return response.ok
    }

    public async getUsers(searchPrompt: string, authContext: any, link?: string): Promise<PaginatedUserFields> {
        const queryParams = {
            "first_name": searchPrompt,
            "last_name": searchPrompt,
            "username": searchPrompt
        }
        const urlParams = new URLSearchParams(queryParams);

        const response = await this.daoService.getUsers(urlParams, authContext, link);

        if (response.ok) {
            const userData = await response.json();
            return userData; 
        }
        else {
            throw new Error("Error fetching users info");
        }
    }

    public async googleSignIn(tokenId: string): Promise<{access: string, refresh: string}> {
      const response = await this.daoService.googleSignIn(tokenId);
      if (response.ok) {
        const tokens = await response.json();
        return tokens;
      }
      else {
          return { access: "", refresh: "" };
      }
    }

    public async updateEmail(email: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.updateEmail(email, authContext);
        return response.ok;
    }

    public async updateOtpConfirm(email: string, otp: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.updateOtpConfirm(email, otp, authContext);
        return response.ok;
    }

    public async becomePremium(isAnnual: boolean, authContext: any): Promise<boolean> {
        const response = await this.daoService.becomePremium(isAnnual, authContext);
        return response.ok;
    }

    public async tryPremium(authContext: any): Promise<boolean> {
        const response = await this.daoService.tryPremium(authContext);
        return response.ok;
    }

    public async getPremium(authContext: any): Promise<Premium> {
        const response = await this.daoService.getPremium(authContext);

        if (response.ok) {
            const result: Premium[] = await response.json();
            return result[0];
        }

        return {};
    }

    public async getAddress(authContext: any): Promise<Address | undefined> {
        const response = await this.daoService.getAddress(authContext);
        
        if (response.ok) {
            const addresses: Address[] = await response.json();
            return addresses[0];
        }
    }

    public async updateAddress(address: Address, id: string, authContext: any): Promise<boolean> {
        const newAddress = removeEmptyFields(address);

        const response = await this.daoService.updateAddress(newAddress, id, authContext);
        return response.ok;
    }

    public async deleteAddress(id: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.deleteAddress(id, authContext);
        return response.ok;
    }

    public async getPost(authContext: any): Promise<Post | undefined> {
        const response = await this.daoService.getPost(authContext);
        
        if (response.ok) {
            const addresses: Post[] = await response.json();
            return addresses[0];
        }
    }

    public async updatePost(post: Post, id: string, authContext: any): Promise<boolean> {
        const newPost = removeEmptyFields(post);

        const response = await this.daoService.updatePost(newPost, id, authContext);
        return response.ok;
    }

    public async deletePost(id: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.deletePost(id, authContext);
        return response.ok;
    }
}
