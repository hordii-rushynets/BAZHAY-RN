import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithAuth } from "../../utils/helpers";
import { UserFields } from "./interfaces";

export class AccountDAOService {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }
  
    public async refreshToken(refreshToken: string): Promise<Response> {
        const response = await fetch(`${this.apiUrl}/api/account/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({
              "refresh": refreshToken
            }),
            headers: {
              "Content-Type": "application/json",
            }
          })
        return response;
    }

    public async authenticate(email: string): Promise<Response> {
        const response = await fetch(`${this.apiUrl}/api/account/auth/`, {
            method: 'POST',
            body: JSON.stringify({
              "email": email
            }),
            headers: {
              "Content-Type": "application/json",
            }
          })
        return response;
    }

    public async otpConfirm(email: string, otp: string): Promise<Response> {
        const response = await fetch(`${this.apiUrl}/api/account/auth/confirm/`, {
            method: 'POST',
            body: JSON.stringify({
              "email": email,
              "code": otp
            }),
            headers: {
              "Content-Type": "application/json",
            }
          })
        return response;
    }

    public async authGuest(): Promise<Response> {
        const response = await fetch(`${this.apiUrl}/api/account/auth/guest/`, {
            method: 'POST',
          })
        return response;
    }

    public async userUpdate(userData: UserFields, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/account/user/`, {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
            }
          }, authContext)
        return response;
    }

    public async userPhotoUpdate(photo: FormData, authContext: any): Promise<Response> {
      const xhr = new XMLHttpRequest();
      const accessToken = await AsyncStorage.getItem('AccessToken');

      return new Promise((resolve, reject) => {
        xhr.onreadystatechange = e => {
          if (xhr.readyState !== 4) {
            return;
          }
        
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.statusText);
          }
        };
        xhr.open("PUT", `${this.apiUrl}/api/account/user/`);
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(photo);
      });
  }
}
  