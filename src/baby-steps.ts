export function calculateSum(args: string[]): number {
    let sum = 0;

    for (let i = 0; i < args.length; i++) {
        const num = Number(args[i]);
        if (!isNaN(num)) {
            sum += num;
        }
    }

    return sum;
}

if (require.main === module) {
    const args = process.argv.slice(2);
    console.log(calculateSum(args));
}
