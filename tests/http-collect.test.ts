import { httpGetData } from '../src/http-collect';
import * as http from 'http';

jest.mock('http');

describe('httpGetData', () => {
    it('retrieves data from HTTP GET request', done => {
        const mockData = 'Hello World';
        (http.get as unknown as jest.Mock).mockImplementation((url, callback) => {
            const response = {
                on: jest.fn((event, handler) => {
                    if (event === 'data') handler(mockData);
                    if (event === 'end') handler();
                }),
                setEncoding: jest.fn(),
            };
            callback(response);
            return { on: jest.fn() };
        });

        httpGetData('http://example.com', (length, data) => {
            expect(length).toBe(mockData.length);
            expect(data).toBe(mockData);
            done();
        }, (error) => {
            done(error);
        });
    });
});
