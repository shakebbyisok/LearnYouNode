import { helloWorld } from '../src/hello-world';

describe('helloWorld', () => {
    it('returns HELLO WORLD', () => {
        expect(helloWorld()).toBe('HELLO WORLD');
    });
});
