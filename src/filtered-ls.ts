import * as fs from 'fs';
import * as path from 'path';

export function filterFiles(directory: string, extension: string, callback: (err: NodeJS.ErrnoException | null, files?: string[]) => void): void {
    fs.readdir(directory, (err, list) => {
        if (err) {
            callback(err);
            return;
        }

        const filteredFiles = list.filter(file => path.extname(file) === '.' + extension);
        callback(null, filteredFiles);
    });
}

if (require.main === module) {
    const directory = process.argv[2];
    const extension = process.argv[3];
    filterFiles(directory, extension, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        if (files) {
            files.forEach(file => console.log(file));
        }
    });
}
