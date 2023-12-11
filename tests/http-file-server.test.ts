import { createHttpFileServer } from '../src/http-file-server';
import * as http from 'http';
import * as fs from 'fs';
import { Readable } from 'stream';
import { AddressInfo } from 'net'; // Importing AddressInfo from 'net'

jest.mock('fs');

describe('HTTP File Server', () => {
    let testServer: http.Server;
    const mockData = 'Hello World';
    const mockStream = Readable.from([mockData]);

    beforeAll(() => {
        (fs.createReadStream as jest.Mock).mockReturnValue(mockStream);
        testServer = createHttpFileServer(0, 'dummy.txt'); // 0 for a random port
    });

    afterAll((done) => {
        testServer.close(() => {
            done();
        });
    });

    it('serves file content', (done) => {
        const port = (testServer.address() as AddressInfo).port; // Using AddressInfo from 'net'
        http.get(`http://localhost:${port}`, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                expect(data).toBe(mockData);
                done();
            });
        });
    });
});
