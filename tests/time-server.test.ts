import { createTimeServer } from '../src/time-server';
import * as net from 'net';

describe('TCP Time Server', () => {
    let testServer: net.Server;
    let port: number;

    beforeAll((done) => {
        testServer = createTimeServer(0); // 0 to assign a random port
        testServer.on('listening', () => {
            port = (testServer.address() as net.AddressInfo).port;
            done();
        });
    });

    afterAll((done) => {
        testServer.close(() => {
            done();
        });
    });

    it('sends the current time and closes the connection', (done) => {
        const client = net.createConnection({ port }, () => {
            client.on('data', (data) => {
                expect(data.toString()).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/);
                client.end();
            });
            client.on('end', done);
        });
    });
});
