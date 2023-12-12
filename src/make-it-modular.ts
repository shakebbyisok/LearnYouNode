import { mymodule } from './mymodule';

const directory = process.argv[2];
const extension = process.argv[3];

mymodule(directory, extension, (err, files) => {
    if (err) {
        return console.error('There was an error:', err);
    }

    files?.forEach(file => {
        console.log(file);
    });
});

if (require.main === module) {
    
}
