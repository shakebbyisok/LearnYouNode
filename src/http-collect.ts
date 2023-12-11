import * as http from 'http';

export function httpGetData(url: string, callback: (length: number, data: string) => void, errorCallback: (error: Error) => void): void {
    http.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            callback(data.length, data);
        });

    }).on('error', (error) => {
        errorCallback(error);
    });
}

if (require.main === module) {
    const url = process.argv[2];
    httpGetData(url, (length, data) => {
        console.log(length);
        console.log(data);
    }, console.error);
}
