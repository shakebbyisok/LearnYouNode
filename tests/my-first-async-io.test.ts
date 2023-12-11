import { addOne } from '../src/my-first-async-io';
import * as fs from 'fs';

jest.mock('fs');

describe('addOne', () => {
    it('counts the number of lines in a file', done => {
        const mockFileContents = 'Line 1\nLine 2\nLine 3';
        (fs.readFile as unknown as jest.Mock).mockImplementation((path, encoding, callback) => {
            callback(null, mockFileContents);
        });

        addOne('test.txt', (numberOfLines) => {
            expect(numberOfLines).toBe(3);
            done();
        });
    });

    it('handles file read errors', done => {
        const mockError = new Error('File read error');
        (fs.readFile as unknown as jest.Mock).mockImplementation((path, encoding, callback) => {
            callback(mockError, null);
        });

        const logErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        addOne('nonexistent.txt', () => {
            expect(logErrorSpy).toHaveBeenCalledWith(mockError);
            logErrorSpy.mockRestore();
            done();
        });
    });
});
