import { mymodule } from '../src/mymodule';
import * as fs from 'fs';

jest.mock('fs');

describe('mymodule', () => {
    it('filters files by the given extension', done => {
        (fs.readdir as unknown as jest.Mock).mockImplementation((dir, callback) => {
            callback(null, ['test.txt', 'example.md', 'note.txt']);
        });

        mymodule('/some/dir', 'txt', (err, files) => {
            expect(err).toBeNull();
            expect(files).toEqual(['test.txt', 'note.txt']);
            done();
        });
    });

    it('returns an error when directory reading fails', done => {
        const mockError = new Error('Failed to read directory');
        (fs.readdir as unknown as jest.Mock).mockImplementation((dir, callback) => {
            callback(mockError, null);
        });

        mymodule('/some/dir', 'txt', (err, files) => {
            expect(err).toEqual(mockError);
            expect(files).toBeUndefined();
            done();
        });
    });
});
