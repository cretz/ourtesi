/// <reference path="../../../refs.d.ts" />

module Ourtesi.Governor.Persistence.Nedb {

    export class NedbStorage implements Storage.IStorage {
        addAuthToUser(userId: string, auth: Model.IUserAuth, cb: Storage.IResult) {
            // TODO
        }

        getUserFromAuth(auth: Model.IUserAuth, cb: Storage.IData<string>) {
            // TODO
        }
    }
}