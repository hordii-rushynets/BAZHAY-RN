import { fetchWithAuth } from "../../utils/helpers";

export class TechSupportDAOService {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      this.apiUrl = apiUrl;
    }

    public async createQuestion(formData: FormData, authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/support/`, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }, authContext);
        return response;
    }

    public async getQuestions(authContext: any): Promise<Response> {
        const response = await fetchWithAuth(`${this.apiUrl}/api/support/`, {}, authContext);
        return response;
    }
}
  