export interface Session {
    id: string;
    abbr: string;
    title: string;
    abstract: string;
    type: string;
    day: string;
    hotel: string;
    level: string;
    rooms: string;
    times: string;
}

export interface Filters {
    hotels: string[];
    days: string[];
    types: string[];
    levels: string[];
    title: string | null;
    favorites: boolean;
    description: string | null;
}