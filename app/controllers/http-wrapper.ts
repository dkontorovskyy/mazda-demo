import {request as httpRequest} from "https";

export class HttpWrapper {

    public static get(options: any): Promise<any> {
        options.method = "GET";
        return new Promise((resolve, reject) => {
            let req = httpRequest(options, response => {
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