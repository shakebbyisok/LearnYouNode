import * as http from 'http';

// Function to perform HTTP GET request and return a promise
function httpGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            let data: string = '';
            response.on('data', (chunk: any) => { data += chunk; });
            response.on('end', () => { resolve(data); });
            response.on('error', (e) => { reject(e); });
        });
    });
}

// Export the function for testing purposes
export { httpGet };

if (require.main === module) {
    const urls: string[] = process.argv.slice(2);
    const promises: Promise<string>[] = urls.map(url => httpGet(url));

    Promise.all(promises)
        .then(results => {
            results.forEach(result => console.log(result));
        })
        .catch(error => console.error('Error:', error));
}
