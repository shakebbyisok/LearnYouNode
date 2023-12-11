import * as net from 'net';

export function createTimeServer(port: number) {
    const server = net.createServer((socket) => {
        const now = new Date();
        const formattedTime = now.toISOString().substring(0, 10) + ' ' 
                              + now.toTimeString().substring(0, 5);
        socket.end(formattedTime + '\n');
    });

    server.listen(port);
    return server;
}

if (require.main === module) {
    const port = Number(process.argv[2]);
    createTimeServer(port);
}
