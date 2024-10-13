import { HomeDAOService } from "./dao-services"
import config from "../../config.json"
import { Paginated } from "../main/interfaces";
import { Button, Notification } from "../../contexts/NotificationContext";

export class HomeService {
    private daoService: HomeDAOService;

    constructor() {
        this.daoService = new HomeDAOService(config.apiUrl || "");
    }

    public async getNotifications(authContext: any): Promise<Notification[]> {
        const response = await this.daoService.getNotifications(authContext);
        if (response.ok) {
            const notifications = await response.json(); 
            return notifications;
        }
        
        return [];
    } 

    public async buttonAction(request: {url: string, body: Object}, authContext: any): Promise<{isSuccess: boolean, isForbidden?: boolean}> {
        if (request.url !== "") {
            const response = await this.daoService.buttonAction(request, authContext);
            
            if (response.ok) {
                return {isSuccess: true};
            }
            if (response.status === 403) {
                return { isSuccess: false, isForbidden: true };
            }

            return {isSuccess: false};
        }
        else {
            return { isSuccess: true };
        }
    }
}
