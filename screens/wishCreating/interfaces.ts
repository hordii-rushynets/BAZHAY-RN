import { UserFields } from "../auth/interfaces";

export type Wish = {
    id?: string;
    name?: string;
    price?: number;
    link?: string;
    currency?: string;
    description?: string;
    access_type?: string;
    media?: string;
    is_fully_created?: boolean;
    author?: UserFields;
}