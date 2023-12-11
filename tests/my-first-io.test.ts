import * as fs from 'fs';
import { countLines } from '../src/my-first-io';

jest.mock('fs');

describe('countLines', () => {
    it('correctly counts the number of lines in a file', () => {
        (fs.readFileSync as jest.Mock).mockReturnValue('Line 1\nLine 2\nLine 3');
        expect(countLines('dummy.txt')).toBe(3);
    });

    // Additional tests can be written for different scenarios
});
