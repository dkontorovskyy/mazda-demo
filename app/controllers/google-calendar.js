"use strict";
const http_wrapper_1 = require("./http-wrapper");
class GoogleCalendarWrapper {
    constructor() {
    }
    getEvents() {
        let options = {
            hostname: 'www.googleapis.com',
            port: 443,
            path: '/calendar/v3/calendars/lentech.mazda@gmail.com/events',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ya29.GlsVBC07ZDiJM8J51vrQnnkwizn0okCKI02OERZYZrp9MgTef_XCnn0RRk6R16pvzSiqtPpa1i-kYmWSRIFZa-r-CK0Fz4fbjt6gMrfUlrZoEcTPVPlexAUe5WBO'
            }
        };
        return http_wrapper_1.HttpWrapper.get(options).then(({ items }) => {
            let gaps;
            let now = new Date();
            let nowDate = now.toISOString();
            let inAWeek = new Date(now.setDate(now.getDate() + 7)).toISOString();
            let events = [];
            items.forEach(({ summary, start, location }) => {
                let startTime = new Date(start.dateTime).toISOString();
                if (nowDate < startTime && inAWeek > startTime) {
                    events.push({ name: summary, start: startTime, location: location });
                }
            });
            gaps = this.possibleGaps(events);
            return Promise.resolve(gaps);
        });
    }
    possibleGaps(events) {
        let poss = [];
        for (let i = 0; i <= events.length - 2;) {
            poss.push({
                event: { name: events[i + 1].name, startDate: events[i + 1].start, location: events[i + 1].location }
            });
            i += 2;
        }
        return poss;
    }
}
exports.GoogleCalendarWrapper = GoogleCalendarWrapper;
//# sourceMappingURL=google-calendar.js.map