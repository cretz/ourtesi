
module Ourtesi.Model {
    export interface Status {

    }

    export interface Circle {
        id: string;
        name: string;
        users: number[];
    }

    export interface Update {
        id: string;
        time: string;
        markdown: string;
        circles: string[];
        users: string[];
        tags: string[];
    }
}