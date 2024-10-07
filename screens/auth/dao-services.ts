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

    public async authGuest(imei: string): Promise<Response> {
        const response = await fetch(`${this.apiUrl}/api/account/auth/guest/`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imei: imei
            })
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

    public async userPhotoUpdate(formData: FormData, authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/account/user/photo/`, {
        method: 'PUT',
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }, authContext)
      return response;
    }

    public async getUser(authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/account/user/`, {}, authContext)
        return response;
    }

    public async getUserById(userId: string, authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/account/users/${userId}/`, {}, authContext)
      return response;
  }

    public async deleteUser(authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/account/user/`, {
        method: "DELETE",
      }, authContext)
      return response;
    }

    public async getUsers(urlParams: URLSearchParams, authContext: any, link?: string): Promise<Response> {
      const response = await fetchWithAuth((link ? link : `${this.apiUrl}/api/account/users/?`) + urlParams, {}, authContext)
      return response;
    }

    public async googleSignIn(tokenId: string): Promise<Response> {
      const response = await fetch((`${this.apiUrl}/api/account/auth/google/`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "token": tokenId
        })
      })
      return response;
    }

    public async updateEmail(email: string, authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/account/user/update-email/`, {
        method: 'POST',
        body: JSON.stringify({
          "email": email
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }, authContext)
      return response;
    }

    public async updateOtpConfirm(email: string, otp: string, authContext: any): Promise<Response> {
      const response = await fetchWithAuth(`${this.apiUrl}/api/account/user/update-email/confirm/`, {
          method: 'POST',
          body: JSON.stringify({
            "email": email,
            "code": otp
          }),
          headers: {
            "Content-Type": "application/json",
          }
        }, authContext)
      return response;
  }
}
  