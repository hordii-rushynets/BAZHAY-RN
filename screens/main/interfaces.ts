import { UserFields } from "../auth/interfaces";

export interface Article {
    slug: string;
    title: string;
    photo: string;
    description: string;
}

export interface Brand {
    slug: string;
    name: string;
    nickname: string;
    photo: string;
    description: string;
}

export type userType = "subscriptions" | "subscribers";

export interface Subscription {
    id: string;
    user?: UserFields;
    subscribed_to?: UserFields;
}

export interface SubscriptionPagination {
    count: number;
    next: string;
    prvious: string;
    results: Subscription[];
}