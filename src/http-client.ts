import * as http from 'http';

export function httpRequest(url: string, callback: (data: string) => void, errorCallback: (error: Error) => void): void {
    http.get(url, (response) => {
        response.setEncoding('utf8');
        response.on('data', callback);
        response.on('error', errorCallback);
    });
}

if (require.main === module) {
    const url = process.argv[2];
    httpRequest(url, console.log, console.error);
}
