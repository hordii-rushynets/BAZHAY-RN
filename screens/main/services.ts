import { MainDAOService } from "./dao-services"
import config from "../../config.json"
import { Article, Brand, Paginated, SubscriptionPagination, userType } from "./interfaces";
import { Wish } from "../wishCreating/interfaces";
import { UserFields } from "../auth/interfaces";

export class MainService {
    private daoService: MainDAOService;

    constructor() {
        this.daoService = new MainDAOService(config.apiUrl || "");
    }

    public async getNews(authContext: any): Promise<{results: Article[]}> {
        const response = await this.daoService.getNews(authContext);
        if (response.ok) {
            const articles = await response.json();
            return articles;
        } else {
            return {results: []};
        }
    } 

    public async getBrands(authContext: any): Promise<{results: Brand[]}> {
        const response = await this.daoService.getBrands(authContext);
        if (response.ok) {
            const brands = await response.json();
            return brands;
        } else {
            return {results: []};
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

    public async getSubscription(userType: userType, authContext: any, link?: string): Promise<SubscriptionPagination> {
        const response = await this.daoService.getSubscription(userType, authContext, link);
        if (response.ok) {
            const resultsWithPagination = await response.json();
            return resultsWithPagination;
        } else {
            throw new Error("Error while fetching subscription");
        }
    }

    public async subscribe(userId: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.subscribe(userId, authContext);
        return response.ok;
    }

    public async unsubscribe(userId: string, authContext: any): Promise<boolean> {
        const response = await this.daoService.unsubscribe(userId, authContext);
        return response.ok;
    }

    public async search(query: {[key: string]: boolean}, prompt: string, authContext: any): Promise<{wishes?: Wish[], users?: UserFields[], brands?: Brand[]}> {
        let urlParams = query;
        if (!query.wishes && !query.users && !query.brands) {
            urlParams = {
                "wishes": true,
                "brands": true,
                "users": true
            }
        }

        const response = await this.daoService.search(urlParams, prompt, authContext);
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        return {wishes: [], users: [], brands: []};
    }

    public async searchWithPagination(query: {[key: string]: boolean}, prompt: string, authContext: any, url?: string): Promise<{count: number, next: string, previous: string, results: {wishes?: Wish[], users?: UserFields[], brands?: Brand[]}}> {
        let urlParams = query;
        if (!query.wishes && !query.users && !query.brands) {
            urlParams = {
                "wishes": true,
                "brands": true,
                "users": true
            }
        }

        const response = await this.daoService.search(urlParams, prompt, authContext, url);
        if (response.ok) {
            const result = await response.json();
            return result;
        }
        return {count: 0, next: "", previous: "", results: {wishes: [], users: [], brands: []}};
    }
}
