import { filterFiles } from '../src/filtered-ls';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

describe('filterFiles', () => {
    it('filters files by the given extension', done => {
        (fs.readdir as unknown as jest.Mock).mockImplementation((dir, callback) => {
            callback(null, ['test.txt', 'example.md', 'note.txt']);
        });
        (path.extname as unknown as jest.Mock).mockImplementation((file) => {
            return '.' + file.split('.').pop();
        });

        filterFiles('/some/dir', 'txt', (err, files) => {
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

        filterFiles('/some/dir', 'txt', (err, files) => {
            expect(err).toEqual(mockError);
            expect(files).toBeUndefined();
            done();
        });
    });
});
