import * as fs from 'fs';

export function addOne(fileName: string, callback: (numberOfLines: number) => void): void {
  fs.readFile(fileName, 'utf8', (err, fileContents) => {
    if (err) {
      console.error(err);
      return;
    }

    const split = fileContents.split('\n');
    const numberOfLines = split.length - 1;
    callback(numberOfLines);
  });
}

export function logN(numberOfLines: number): void {
  console.log(numberOfLines);
}

if (require.main === module) {
    const fileName = process.argv[2];
    addOne(fileName, logN);
}
