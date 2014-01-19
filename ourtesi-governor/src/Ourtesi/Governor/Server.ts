/// <reference path="../../refs.d.ts" />

import WebSocket = require("ws");

module Ourtesi.Governor {
    import Storage = Ourtesi.Governor.Persistence.Storage;

    export class Server {
        private server: WebSocket.Server;
        private storage: Storage.IStorage;
        private users: { [userId: string]: WebSocket } = { }

        constructor(private config: IConfig) { }

        private onMessage(sock: WebSocket, msg: string) {
            // TODO
        }

        start(cb: (err?: string) => void) {
            if (this.server != null) cb("Server already started")
            else {
                // Create storage first
                Storage.factory(this.config, (err: string, storage: Storage.IStorage) => {
                    if (err) cb(err)
                    else {
                        // Now the server
                        this.server = new WebSocket.Server(this.config).on("connection", (sock) => {
                            sock.on('message', (msg: string) => this.onMessage(sock, msg));
                        })
                        // Done
                        cb();
                    }
                });
            }
        }

        stop() {
            if (this.server != null) {
                this.storage = null;
                this.server.close();
                this.server = null;
            }
        }
    }
}