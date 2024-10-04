import { HomeDAOService } from "./dao-services"
import config from "../../config.json"
import { Paginated } from "../main/interfaces";
import { Notification } from "../../contexts/NotificationContext";

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
}
