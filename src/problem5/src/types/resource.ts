export interface Resource {
    id?: number;
    name: string;
    description?: string;
    category?: string;
    created_at?: string;
}

export interface ResourceFilters {
    category?: string;
    name?: string;
}

export type SqlParameter = string | number | boolean | null;
