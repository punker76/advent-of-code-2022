import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const datastream = [...this.input.trim()];

    const result = datastream.findIndex((_value, index, array) => {
      return index > 3 && new Set(array.slice(index - 4, index)).size === 4;
    });

    return `day 6 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 6 solution 1: 1794';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 6 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 6 solution 2';
  }
}
