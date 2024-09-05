import { MainDAOService } from "./dao-services"
import config from "../../config.json"
import { Article, Brand } from "./interfaces";

export class MainService {
    private daoService: MainDAOService;

    constructor() {
        this.daoService = new MainDAOService(config.apiUrl || "");
    }

    public async getNews(authContext: any): Promise<Article[]> {
        const response = await this.daoService.getNews(authContext);
        if (response.ok) {
            const articles = await response.json();
            return articles;
        } else {
            return [];
        }
    } 

    public async getBrands(authContext: any): Promise<Brand[]> {
        const response = await this.daoService.getBrands(authContext);
        if (response.ok) {
            const brands = await response.json();
            return brands;
        } else {
            return [];
        }
    } 

    public async getArticle(slug: string, authContext: any): Promise<Article | undefined> {
        const response = await this.daoService.getArticle(slug, authContext);
        if (response.ok) {
            const article = await response.json();
            return article;
        } else {
            return undefined;
        }
    }

    public async getBrand(slug: string, authContext: any): Promise<Brand | undefined> {
        const response = await this.daoService.getBrand(slug, authContext);
        if (response.ok) {
            const brand = await response.json();
            return brand;
        } else {
            return undefined;
        }
    } 
}
