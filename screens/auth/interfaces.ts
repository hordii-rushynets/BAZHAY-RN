export type UserFields = {
    id?: string;
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    birthday?: string;
    view_birthday?: boolean;
    sex?: string;
    photo?: string;
    about_user?: string;
    subscriber?: number; 
    subscription?: number;
    is_subscribed?: boolean;
    is_premium?: boolean;
    haveErrors?: boolean;
}

export type PaginatedUserFields = {
    count: number;
    next?: string;
    previous?: string;
    results: UserFields[]
}

export type Address = {
    id?: string;
    country?: string;
    region?: string;
    city?: string;
    street?: string;
    post_index?: string;
    full_name?: string;
    phone_number?: string;
}

export type Post = {
    id?: string;
    country?: string;
    post_service?: string;
    city?: string;
    nearest_branch?: string;
    full_name?: string;
    phone_number?: string;
}

export interface Premium {
    is_an_annual_payment?: boolean;
    is_trial_period?: boolean;
    expiration_date?: string;
}