import { httpRequest } from '../src/http-client';
import * as http from 'http';

jest.mock('http');

describe('httpRequest', () => {
    it('handles HTTP response correctly', done => {
        (http.get as unknown as jest.Mock).mockImplementation((url, callback) => {
            const response = {
                on: jest.fn((event, handler) => {
                    if (event === 'data') setTimeout(() => handler('test response'), 0);
                }),
                setEncoding: jest.fn(),
            };
            callback(response);
            return { on: jest.fn() };
        });

        httpRequest('http://example.com', (data) => {
            expect(data).toBe('test response');
            done();
        }, (error) => {
            done.fail('Unexpected error: ' + error);
        });
    });

    it('handles HTTP errors correctly', done => {
        (http.get as unknown as jest.Mock).mockImplementation((url, callback) => {
            const response = {
                on: jest.fn((event, handler) => {
                    if (event === 'error') setTimeout(() => handler(new Error('test error')), 0);
                }),
                setEncoding: jest.fn(),
            };
            callback(response);
            return { on: jest.fn() };
        });

        httpRequest('http://example.com', (data) => {
            done.fail('Unexpected success with data: ' + data);
        }, (error) => {
            expect(error.message).toBe('test error');
            done();
        });
    });
});
