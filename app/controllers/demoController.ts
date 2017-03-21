import {GoogleMapsWrapper} from "./google-maps";
import {MazdaWrapper} from "./mazda-api";
import {GoogleCalendarWrapper} from "./google-calendar";
export class MazdaDemo {

    suggest(req, res) {

        let yourLocation = {lat: '', lon: ''};
        let finalEventLocation = {lat: '', lon: ''};

        let mazdaLocation: MazdaWrapper = new MazdaWrapper();
        let googleMaps: GoogleMapsWrapper = new GoogleMapsWrapper();

        mazdaLocation.getYourLocation().then(({results: {1: {gps_lat, gps_lon}}}) => {
            yourLocation.lat = gps_lat;
            yourLocation.lon = gps_lon;

            let googleCalendar: GoogleCalendarWrapper = new GoogleCalendarWrapper();
            return googleCalendar.getEvents();
        }).then(event => {
            let closestEvent = event[0].event;
            let locationForGoogleSearch = closestEvent.location.replace(/\s/g, '+');
            return googleMaps.getCoordinateByText(locationForGoogleSearch);
        }).then(({results}) => {
            finalEventLocation.lat = results[0].geometry.location.lat;
            finalEventLocation.lon = results[0].geometry.location.lon;

            return googleMaps.getPlacesNearby(yourLocation, req.params.keyword)
        }).then(({results}) => {
            let threeFirst = results.splice(0, 3);

            let places = threeFirst.map(({icon, geometry: {location}, rating, vicinity, name}) => {
               return {icon, location, rating, address: vicinity, name};
            });
            return res.send(200, {choose: places, now: yourLocation, finalDest: finalEventLocation});
        }).catch(err => {
            res.send(500, err);
        });
    }
}