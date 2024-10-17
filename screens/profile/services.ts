import { TechSupportDAOService } from "./dao-services"
import config from "../../config.json"
import { FileInterface } from "../wishCreating/interfaces";

export class TechSupportService {
    private daoService: TechSupportDAOService;

    constructor() {
        this.daoService = new TechSupportDAOService(config.apiUrl || "");
    }

    public async createQuestion(question: string, file: FileInterface | undefined, authContext: any): Promise<boolean> {
        const formData = new FormData();
        formData.append("question", question);
        file && formData.append("file", file as any);

        const response = await this.daoService.createQuestion(formData, authContext);
        return response.ok;
    }

    public async getQuestions(authContext: any): Promise<{question: string, file?: string}[]> {
        const response = await this.daoService.getQuestions(authContext);

        if (response.ok) {
            const questions = await response.json();
            return questions;
        }

        return [];
    }
}
