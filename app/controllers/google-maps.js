"use strict";
const http_wrapper_1 = require("./http-wrapper");
class GoogleMapsWrapper {
    getPlacesNearby(gps, query) {
        let radius = 1500;
        let type = `food`;
        let options = {
            hostname: 'maps.googleapis.com',
            port: 443,
            path: `/maps/api/place/nearbysearch/json?location=${gps.lat},${gps.lon}&radius=${radius}&types=${type}&keyword=${query}&opennow=true&rankby=prominence&key=AIzaSyDWN8MnoXqTENXa4bobi941-wls5zQPUkM`,
            headers: {
                'content-type': 'application/json',
            }
        };
        return http_wrapper_1.HttpWrapper.get(options);
    }
    getCoordinateByText(query) {
        let encodedURL = encodeURI(query);
        let options = {
            hostname: 'maps.googleapis.com',
            port: 443,
            path: `/maps/api/place/textsearch/json?query=${encodedURL}&key=AIzaSyDWN8MnoXqTENXa4bobi941-wls5zQPUkM`,
            headers: {
                'content-type': 'application/json',
            }
        };
        return http_wrapper_1.HttpWrapper.get(options);
    }
}
exports.GoogleMapsWrapper = GoogleMapsWrapper;
//# sourceMappingURL=google-maps.js.map