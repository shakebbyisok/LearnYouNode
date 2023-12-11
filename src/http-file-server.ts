import * as http from 'http';
import * as fs from 'fs';

const port = process.argv[2];
const file = process.argv[3];

http.createServer((request, response) => {
  fs.createReadStream(file).pipe(response);
}).listen(+port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
