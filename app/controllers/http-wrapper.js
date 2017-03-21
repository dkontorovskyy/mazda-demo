"use strict";
const https_1 = require("https");
class HttpWrapper {
    static get(options) {
        options.method = "GET";
        return new Promise((resolve, reject) => {
            let req = https_1.request(options, response => {
                let str = '';
                response.on('data', chunk => {
                    str += chunk;
                });
                response.on('end', () => {
                    resolve(JSON.parse(str));
                });
            });
            req.on('error', err => {
                reject(err);
            });
            req.end();
        });
    }
}
exports.HttpWrapper = HttpWrapper;
//# sourceMappingURL=http-wrapper.js.map