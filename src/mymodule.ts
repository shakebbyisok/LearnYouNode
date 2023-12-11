import * as fs from 'fs';
import * as path from 'path';

export function mymodule(directory: string, extension: string, callback: (err: Error | null, files?: string[]) => void): void {
    fs.readdir(directory, (err, list) => {
        if (err) {
            return callback(err);
        }

        const filteredFiles = list.filter(file => path.extname(file) === '.' + extension);
        callback(null, filteredFiles);
    });
}
