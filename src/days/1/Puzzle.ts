import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const calories = this.input
      .split('\n')
      .map((x) => (x && x !== '' ? +x : -1));

    let maxTotalCalories = 0;
    let curentCal = 0;

    calories.forEach((cal) => {
      if (cal >= 0) {
        curentCal += cal;
        maxTotalCalories = Math.max(maxTotalCalories, curentCal);
      } else {
        curentCal = 0;
      }
    });

    return `day 1 solution 1: ${maxTotalCalories}`;
  }
  public solveSecond(): string {
    const calories = this.input
      .split('\n')
      .map((x) => (x && x !== '' ? +x : -1));

    let currentElf = 0;
    let elvesCalories: number[] = [];

    calories.forEach((cal) => {
      if (cal >= 0) {
        elvesCalories[currentElf] = (elvesCalories[currentElf] ?? 0) + cal;
      } else {
        currentElf++;
      }
    });

    elvesCalories = elvesCalories.sort((a, b) => b - a);
    return `day 1 solution 2: ${
      elvesCalories[0] + elvesCalories[1] + elvesCalories[2]
    }`;
  }

  public getFirstExpectedResult(): string {
    return 'day 1 solution 1: 75501';
  }
  public getSecondExpectedResult(): string {
    return 'day 1 solution 2: 215594';
  }
}
