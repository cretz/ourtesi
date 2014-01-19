/// <reference path="../../../refs.d.ts" />

module Ourtesi.Governor.Persistence.Storage {
    export function factory(config: IConfig, cb: (err: string, storage: IStorage) => void) {
        // TODO
    }

    export interface IResult { (err?: string); }

    export interface IData<T> extends IResult { (err?: string, data?: T); }

    export interface IStorage {
        addAuthToUser(userId: string, auth: Model.IUserAuth, cb: IResult);

        getUserFromAuth(auth: Model.IUserAuth, cb: IData<string>);
    }
}