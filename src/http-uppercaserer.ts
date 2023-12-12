import * as http from 'http';

const port = process.argv[2];

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const uppercased = body.toUpperCase();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(uppercased);
    });
  } else {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
});

server.listen(+port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

export default server;
