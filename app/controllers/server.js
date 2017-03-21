"use strict";
const restify_1 = require("restify");
const google_calendar_1 = require("./google-calendar");
const google_maps_1 = require("./google-maps");
const demoController_1 = require("./demoController");
const DEFAULT_PORT = '3000';
class Server {
    run() {
        this.server = restify_1.createServer();
        this.server.use(restify_1.CORS({
            origins: ['*']
        }));
        this.server.opts(/\.*/, (req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.send(200);
            next();
        });
        this.server.use(restify_1.queryParser());
        this.server.get('/', (req, res) => {
            res.send('hello MAZDA');
        });
        let googleCalendar = new google_calendar_1.GoogleCalendarWrapper();
        this.server.get('/events', googleCalendar.getEvents.bind(googleCalendar));
        let googleMaps = new google_maps_1.GoogleMapsWrapper();
        this.server.get('/places', googleMaps.getPlacesNearby.bind(googleMaps));
        let demo = new demoController_1.MazdaDemo();
        this.server.get('/lentech/:keyword', demo.suggest.bind(demo));
        let port = DEFAULT_PORT;
        this.server.listen(port);
        console.info(`Cluster node is listening on port ${port}.`);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map