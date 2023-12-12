import * as http from 'http';
import { URL } from 'url';

const server = http.createServer((req, res) => {
  if (req.url) {
    const parsedUrl = new URL(req.url, `http://localhost:${process.argv[2]}`);
    const iso = parsedUrl.searchParams.get('iso');
    const date = new Date(iso as string);

    let result: Record<string, number> | null = null;

    switch (parsedUrl.pathname) {
      case '/api/parsetime':
        result = {
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds(),
        };
        break;
      case '/api/unixtime':
        result = { unixtime: date.getTime() };
        break;
    }

    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(404);
      res.end();
    }
  }
});

server.listen(Number(process.argv[2]));
