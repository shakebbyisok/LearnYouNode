import * as http from 'http';
import { httpGet } from '../src/juggling-async';

// Mock the HTTP module
jest.mock('http', () => ({
    get: jest.fn((url, callback) => {
        let data: string;
        switch (url) {
            case 'http://testurl1.com':
                data = 'Response from URL 1';
                break;
            case 'http://testurl2.com':
                data = 'Response from URL 2';
                break;
            default:
                data = 'Unknown URL';
        }
        const response = {
            on: jest.fn((event, handler) => {
                if (event === 'data') handler(data);
                if (event === 'end') handler();
            }),
            setEncoding: jest.fn(),
        };
        callback(response);
        return { on: jest.fn() };
    })
}));

describe('httpGet', () => {
    it('should return correct data from a given URL', async () => {
        const data = await httpGet('http://testurl1.com');
        expect(data).toBe('Response from URL 1');
    });

    it('should handle errors correctly', async () => {
        // Mock an error scenario
        (http.get as jest.Mock).mockImplementationOnce((url, callback) => {
            const response = {
                on: jest.fn((event, handler) => {
                    if (event === 'error') handler(new Error('Test error'));
                })
            };
            callback(response);
            return { on: jest.fn() };
        });

        await expect(httpGet('http://errorurl.com')).rejects.toThrow('Test error');
    });
});
