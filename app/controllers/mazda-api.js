"use strict";
const http_1 = require("http");
class MazdaWrapper {
    getYourLocation() {
        let options = {
            hostname: '106.162.184.46',
            port: 80,
            path: `/mazda/api/vehicle/history/vin/yyyymmdd/unique/now?vcl_id=JMZGJ6278Z1227170&gps_yr=2017&gps_mn=3&gps_dy=21&apikey=e6f93b34-d349-4853-984b-e5ea6dd14f93`,
            headers: {
                'content-type': 'application/json',
            }
        };
        return MazdaWrapper.get(options);
    }
    static get(options) {
        options.method = "GET";
        return new Promise((resolve, reject) => {
            let req = http_1.request(options, response => {
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
exports.MazdaWrapper = MazdaWrapper;
//# sourceMappingURL=mazda-api.js.map