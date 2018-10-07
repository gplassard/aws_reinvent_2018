export interface Session {
    id: string;
    abbr: string;
    title: string;
    abstract: string;
    type: string;
    day: string;
    hotel: string;
}

export interface Filters {
    hotels: string[];
    days: string[];
    types: string[];
    title: string | null;
    description: string | null;
}