import { mymodule } from '../src/mymodule';
import * as useModule from '../src/make-it-modular';

jest.mock('../mymodule', () => ({
    mymodule: jest.fn()
}));

describe('useModule', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('calls mymodule with the correct arguments', () => {
        process.argv = ['node', 'useModule.ts', 'some/dir', 'txt'];
        require('../useModule');

        expect(mymodule).toHaveBeenCalledWith('some/dir', 'txt', expect.any(Function));
    });

    it('logs files on successful callback', () => {
        const mockFiles = ['file1.txt', 'file2.txt'];
        (mymodule as jest.Mock).mockImplementation((dir, ext, callback) => {
            callback(null, mockFiles);
        });

        process.argv = ['node', 'useModule.ts', 'some/dir', 'txt'];
        require('../useModule');

        expect(logSpy).toHaveBeenCalledWith('file1.txt');
        expect(logSpy).toHaveBeenCalledWith('file2.txt');
    });

    it('logs error on failed callback', () => {
        const mockError = new Error('Mock error');
        (mymodule as jest.Mock).mockImplementation((dir, ext, callback) => {
            callback(mockError, null);
        });

        process.argv = ['node', 'useModule.ts', 'some/dir', 'txt'];
        require('../useModule');

        expect(errorSpy).toHaveBeenCalledWith('There was an error:', mockError);
    });
});
