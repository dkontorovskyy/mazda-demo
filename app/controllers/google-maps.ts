import {HttpWrapper} from "./http-wrapper";
export class GoogleMapsWrapper {

    getPlacesNearby(gps, query): Promise<any> {


        gps.lat = 32.097789;
        gps.lon = 34.776512;
        let radius = 1500;
        let type = `food`;
        let options = {
            hostname: 'maps.googleapis.com',
            port: 443,
            path: `/maps/api/place/nearbysearch/json?location=${gps.lat},${gps.lon}&radius=${radius}&types=${type}&keyword=${query}&rankby=prominence&key=AIzaSyDWN8MnoXqTENXa4bobi941-wls5zQPUkM`,
            headers: {
                'content-type': 'application/json',
            }
        };
        //TODO use tomorrow!!!
        // path: `/maps/api/place/nearbysearch/json?location=${gps.lat},${gps.lon}&radius=${radius}&types=${type}&keyword=${query}&opennow=true&rankby=prominence&key=AIzaSyDWN8MnoXqTENXa4bobi941-wls5zQPUkM`,


        return HttpWrapper.get(options);
    }

    getCoordinateByText(query): Promise<any> {
        let encodedURL = encodeURI(query);
        let options = {
            hostname: 'maps.googleapis.com',
            port: 443,
            path: `/maps/api/place/textsearch/json?query=${encodedURL}&key=AIzaSyDWN8MnoXqTENXa4bobi941-wls5zQPUkM`,
            headers: {
                'content-type': 'application/json',
            }
        };

        return HttpWrapper.get(options);
    }
}