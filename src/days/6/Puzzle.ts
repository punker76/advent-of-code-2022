import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private getFirstMarker(messageLength: number): number {
    const datastream = [...this.input.trim()];

    const result = datastream.findIndex((_value, index, array) => {
      return (
        index > messageLength - 1 &&
        new Set(array.slice(index - messageLength, index)).size ===
          messageLength
      );
    });

    return result;
  }

  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const result = this.getFirstMarker(4);
    return `day 6 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 6 solution 1: 1794';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const result = this.getFirstMarker(14);
    return `day 6 solution 2: ${result}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 6 solution 2: 2851';
  }
}
