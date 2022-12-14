import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const allRucksacks = this.input.trim().split('\n');

    const result = allRucksacks
      .map((r) => {
        const compartment1 = [...r.substring(0, r.length / 2)];
        const compartment2 = [...r.substring(r.length / 2, r.length)];
        // console.log(compartment1, compartment2);
        const n = compartment1.filter((c) => compartment2.indexOf(c) >= 0)[0];
        // console.log(n);
        if (n.toLowerCase() === n) {
          return n.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        } else {
          return n.charCodeAt(0) - 'A'.charCodeAt(0) + 26 + 1;
        }
      })
      .reduce((p, c) => p + c);

    return `day 3 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 3 solution 1: 7850';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const allRucksacks = this.input.trim().split('\n');

    let result = 0;

    allRucksacks.forEach((r, index) => {
      if ((index + 1) % 3 === 0) {
        // console.log(index, r);

        const compartment1 = [...allRucksacks[index - 2]];
        const compartment2 = [...allRucksacks[index - 1]];
        const compartment3 = [...r];

        const n = compartment1.filter(
          (c) => compartment2.indexOf(c) >= 0 && compartment3.indexOf(c) >= 0
        )[0];
        // console.log(n);

        if (n.toLowerCase() === n) {
          result += n.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        } else {
          result += n.charCodeAt(0) - 'A'.charCodeAt(0) + 26 + 1;
        }
      }
    });

    return `day 3 solution 2: ${result}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 3 solution 2: 2581';
  }
}
