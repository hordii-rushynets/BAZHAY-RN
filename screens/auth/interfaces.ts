export type UserFields = {
    id?: string;
    username?: string;
    first_name?: string;
    birthday?: string;
    view_birthday?: boolean;
    sex?: string;
    photo?: string;
    about_user?: string;
    subscriber?: number; 
    subscription?: number;
    is_subscribed?: boolean;
}

export type PaginatedUserFields = {
    count: number;
    next?: string;
    previous?: string;
    results: UserFields[]
}