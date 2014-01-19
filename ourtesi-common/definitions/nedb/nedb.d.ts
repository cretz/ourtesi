// TODO: cleanup and finish and send to DefinitelyTyped
declare module "nedb" {
    class Datastore {
        constructor(filename: string);
        constructor(options: Datastore.IDatastoreOptions);

        count(query: Object, cb: (err: string, count: number) => void);
        ensureIndex(options: Datastore.IIndexOptions, cb?: (err?: string) => void);
        find<T>(query: Object, cb: (err: string, docs: T[]) => void);
        findOne<T>(query: Object, cb: (err: string, doc: T) => void);
        insert<T extends Object>(doc: T, cb?: (err?: string, newDoc?: T) => void);
        loadDatabase(cb?: (err: string) => void);
        remove(query: Object, options: Datastore.IRemoveOptions, cb?: (err?: string, numRemoved?: number) => void);
        removeIndex(fieldName: string, cb?: (err?: string) => void);
        update(query: Object, update: Object, options: Datastore.IUpdateOptions,
               cb?: (err?: string, numReplaced?: number, upsert?: boolean) => void);
    }

    module Datastore {
        export interface IDatastoreOptions {
            autoload?: boolean;
            filename?: string;
            inMemoryOnly?: boolean;
            onload?: (err: string) => void;
        }

        export interface IIndexOptions {
            fieldName: string;
            sparse?: boolean;
            unique?: boolean;
        }

        export interface IRemoveOptions {
            multi?: boolean;
        }

        export interface IUpdateOptions {
            multi?: boolean;
            upsert?: boolean;
        }
    }

    export = Datastore
}