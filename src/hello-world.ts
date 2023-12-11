export function helloWorld(): string {
    return 'HELLO WORLD';
}

if (require.main === module) {
    console.log(helloWorld());
}
