import { MainDAOService } from "./dao-services"
import config from "../../config.json"

export class MainService {
    private daoService: MainDAOService;

    constructor() {
        this.daoService = new MainDAOService(config.apiUrl || "");
    }

    
}
