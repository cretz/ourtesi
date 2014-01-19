/// <reference path="../../refs.d.ts" />

module Ourtesi.Governor {
    export interface IConfig {
        host: string;
        port: number;
        insecure?: boolean;

        googleAuth: {
            clientId: string;
        }

        persistence: {
            nedb?: { filename?: string }
        }
    }
}