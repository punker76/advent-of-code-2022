import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  private getMyResult(
    player1: { RPC: string; value: number },
    player2: { RPC: string; value: number }
  ): number {
    // console.log(player1, player2);

    // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.

    if (player1.RPC === 'A' && player2.RPC === 'Z') {
      // player 1 wins
      return player2.value + 0;
    } else if (player1.RPC === 'C' && player2.RPC === 'X') {
      // player 2 wins
      return player2.value + 6;
    } else if (player1.RPC === 'C' && player2.RPC === 'Y') {
      // player 1 wins
      return player2.value + 0;
    } else if (player1.RPC === 'B' && player2.RPC === 'Z') {
      // player 2 wins
      return player2.value + 6;
    } else if (player1.RPC === 'B' && player2.RPC === 'X') {
      // player 1 wins
      return player2.value + 0;
    } else if (player1.RPC === 'A' && player2.RPC === 'Y') {
      // player 2 wins
      return player2.value + 6;
    } else if (player1.value === player2.value) {
      // player 2 wins
      return player2.value + 3;
    }
    return 0;
  }

  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const strategyGuide = this.input.trim().split('\n');
    const result = strategyGuide
      .map((l) => {
        const line = [...l];
        // console.log(line);
        const myResult = this.getMyResult(
          {
            RPC: line[0],
            value: line[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1,
          },
          { RPC: line[2], value: line[2].charCodeAt(0) - 'X'.charCodeAt(0) + 1 }
        );
        // console.log(myResult);
        return myResult;
      })
      .reduce((p, c) => p + c);
    return `day 2 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 2 solution 1: 10816';
  }

  private getMyResultFor2(
    player1: { RPC: string },
    player2: { RPC: string }
  ): number {
    // console.log(player1, player2);

    // Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock.

    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.

    if (player1.RPC === 'A') {
      if (player2.RPC === 'X') {
        return 3 + 0;
      } else if (player2.RPC === 'Y') {
        return 1 + 3;
      } else if (player2.RPC === 'Z') {
        return 2 + 6;
      }
    } else if (player1.RPC === 'B') {
      if (player2.RPC === 'X') {
        return 1 + 0;
      } else if (player2.RPC === 'Y') {
        return 2 + 3;
      } else if (player2.RPC === 'Z') {
        return 3 + 6;
      }
    } else if (player1.RPC === 'C') {
      if (player2.RPC === 'X') {
        return 2 + 0;
      } else if (player2.RPC === 'Y') {
        return 3 + 3;
      } else if (player2.RPC === 'Z') {
        return 1 + 6;
      }
    }

    return 0;
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    const strategyGuide = this.input.trim().split('\n');
    const result = strategyGuide
      .map((l) => {
        const line = [...l];
        // console.log(line);
        const myResult = this.getMyResultFor2(
          {
            RPC: line[0],
          },
          { RPC: line[2] }
        );
        // console.log(myResult);
        return myResult;
      })
      .reduce((p, c) => p + c);
    return `day 2 solution 2: ${result}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 2 solution 2: 11657';
  }
}
