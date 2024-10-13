import { UserFields } from "../auth/interfaces";
import { Brand } from "../main/interfaces";

export type Wish = {
    id?: string;
    name?: string;
    price?: number;
    link?: string;
    currency?: string;
    description?: string;
    access_type?: string;
    photo?: string;
    video?: string;
    is_fully_created?: boolean;
    author?: UserFields;
    image_size?: number;
    is_reservation?: boolean;
    is_user_create?: boolean;
    is_your_wish?: boolean;
    is_reserved_by_me?: boolean;
    brand_author?: Brand;
    premiumError?: boolean;
    guestError?: boolean;
    is_fulfilled?: boolean;
    is_me_candidates_to_reservation?: boolean;
}

export interface FileInterface {
    name: string, 
    type: string, 
    uri: string
}

export interface WishAccessModel {
    id: string;
    wish: string;
    users: {user: UserFields}[];
}

export interface Reservation {
    id?: string;
    wish?: string,
    selected_user?: UserFields;
    candidates: {bazhay_user: UserFields}[];
}