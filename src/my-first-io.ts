import * as fs from 'fs';

export function countLines(fileName: string): number {
    const fileContents = fs.readFileSync(fileName, 'utf8');
    const lines = fileContents.split('\n');
    return lines.length - 1;
}

if (require.main === module) {
    const fileName = process.argv[2];
    const numberOfLines = countLines(fileName);
    console.log(numberOfLines);
}
