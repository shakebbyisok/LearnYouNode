import { httpGet } from '../src/juggling-async';

// Mock HTTP responses for testing
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

describe('httpCollector tests', () => {
    it('should get correct data from URL', async () => {
        const data = await httpGet('http://testurl1.com');
        expect(data).toBe('Response from URL 1');
    });
});
