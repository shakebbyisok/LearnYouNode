import * as http from 'http';
import * as fs from 'fs';

const defaultPort = 8000;
const port = parseInt(process.argv[2]) || defaultPort;
const file = process.argv[3] || 'default.txt';

const server = http.createServer((request, response) => {
  fs.createReadStream(file).pipe(response);
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

export default server;
