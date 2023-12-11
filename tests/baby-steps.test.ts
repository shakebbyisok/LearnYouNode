import { calculateSum } from '../src/baby-steps';

describe('calculateSum', () => {
    it('sums an array of number strings correctly', () => {
        expect(calculateSum(["1", "2", "3"])).toBe(6);
    });

    it('handles empty strings and non-numeric values correctly', () => {
        expect(calculateSum(["", "abc", "4", "5"])).toBe(9); // NaN and empty string are treated as 0
    });

    it('handles negative numbers correctly', () => {
        expect(calculateSum(["-2", "3"])).toBe(1);
    });

    it('returns 0 for an empty array', () => {
        expect(calculateSum([])).toBe(0);
    });
});
