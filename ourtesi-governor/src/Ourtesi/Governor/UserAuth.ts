/// <reference path="../../refs.d.ts" />

import https = require("https")
import querystring = require("querystring")

module Ourtesi.Governor {
    import Storage = Ourtesi.Governor.Persistence.Storage

    interface IUserAuth {
        validate(cb: (err: string) => void);
        getUserId(storage: Storage.IStorage, cb: Storage.IData<string>);
        persistAuth(storage: Storage.IStorage, userId: string, cb: Storage.IResult);
    }

    module UserAuth {
        enum Type {
            Insecure,
            Google
        }

        export function factory(config: IConfig, val: { type: Type }): IUserAuth {
            switch (val.type) {
                case Type.Insecure:
                    if (!config.insecure) throw "Insecure disallowed"
                    return new InsecureUserAuth(<IInsecureUserAuthInfo><any>val);
                case Type.Google: return new GoogleUserAuth(config, <IGoogleUserAuthInfo><any>val);
                default: throw "Unrecognized type: " + val.type;
            }
        }

        interface IInsecureUserAuthInfo { userId: string }

        class InsecureUserAuth implements IUserAuth {
            constructor(private info: IInsecureUserAuthInfo) { }

            validate(cb: (err?: string) => void) { cb(); }

            getUserId(storage: Storage.IStorage, cb: Storage.IData<string>) {
                cb(null, this.info.userId);
            }

            persistAuth(storage: Storage.IStorage, userId: string, cb: Storage.IResult) {
                cb("Not allowed")
            }
        }

        interface IGoogleUserAuthInfo { accessToken: string }

        class GoogleUserAuth implements IUserAuth {
            // Ref: https://developers.google.com/accounts/docs/OAuth2UserAgent

            public userId: string;
            public scope: string;
            public expiresIn: number;

            constructor(private config: IConfig, private info: IGoogleUserAuthInfo) { }

            validate(cb: (err?: string) => void) {
                var url = "https://www.googleapis.com/oauth2/v1/tokeninfo?" +
                    querystring.stringify({ accessToken: this.info.accessToken });
                https.get(url, (res) => {
                    // Build response string
                    res.setEncoding("utf-8");
                    var response = "";
                    res.on("data", (data) => response += data);
                    // Handle completion
                    res.on("end", () => {
                        // No response is failure
                        if (response.length == 0) cb("Unknown failure, status: " + res.statusCode);
                        // Not 200 means it should have an error
                        else if (res.statusCode != 200) cb(<string>JSON.parse(response).error);
                        // 200...
                        else {
                            var respData = JSON.parse(response);
                            // Must match our audience
                            if (<string>respData.audience != config.googleAuth.clientId) {
                                cb("Invalid audience given: " + respData.audience);
                            } else {
                                this.userId = <string>respData.user_id;
                                this.scope = <string>respData.scope;
                                this.expiresIn = <number>respData.expires_in;
                                cb();
                            }
                        }
                    });
                }).on('error', cb).end();
            }

            getUserId(storage: Storage.IStorage, cb: Storage.IData<string>) {
                storage.getUserFromAuth({ provider: "google", id: this.userId}, cb);
            }

            persistAuth(storage: Storage.IStorage, userId: string, cb: Storage.IResult) {
                storage.addAuthToUser(userId, { provider: "google", id: this.userId}, cb);
            }
        }
    }
}