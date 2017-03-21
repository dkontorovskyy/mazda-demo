import {createServer, CORS, queryParser, bodyParser} from "restify";
import {GoogleCalendarWrapper} from "./google-calendar";
import {GoogleMapsWrapper} from "./google-maps";
import {MazdaDemo} from "./demoController";
const DEFAULT_PORT = '3000';

export class Server {

    public server;

    run() {
        this.server = createServer();
        this.server.use(CORS({
            origins: ['*']
        }));

        this.server.opts(/\.*/, (req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');

            res.send(200);
            next();
        });

        this.server.use(queryParser());

        this.server.get('/', (req, res) => {
            res.send('hello MAZDA');
        });

        let googleCalendar: GoogleCalendarWrapper = new GoogleCalendarWrapper();
        this.server.get('/events', googleCalendar.getEvents.bind(googleCalendar));

        let googleMaps: GoogleMapsWrapper = new GoogleMapsWrapper();
        this.server.get('/places', googleMaps.getPlacesNearby.bind(googleMaps));

        let demo: MazdaDemo = new MazdaDemo();
        this.server.get('/lentech/:keyword', demo.suggest.bind(demo));

        let port = DEFAULT_PORT;
        this.server.listen(port);
        console.info(`Cluster node is listening on port ${port}.`);
    }
}