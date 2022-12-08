import Puzzle from '../../types/AbstractPuzzle';

interface IDirectoryElement {
  name: string;
  size: number;
}

class File implements IDirectoryElement {
  name: string;
  size: number;

  constructor(name: string, size?: number) {
    this.name = name;
    this.size = size;
  }
}

class Directory implements IDirectoryElement {
  name: string;
  parent: Directory;
  content: IDirectoryElement[] = [];

  constructor(name: string, parent?: Directory) {
    this.name = name;
    this.parent = parent;
  }

  get size(): number {
    return (
      this.content
        // .filter((c) => c instanceof File)
        .map((c) => c.size)
        .reduce((c, p) => c + p, 0)
    );
  }

  public getMost(most: number): number {
    let result = 0;
    const size = this.size;
    if (size < most) {
      result = size;
    }
    result += this.content
      .filter((c) => c instanceof Directory)
      .map((d) => (d as Directory).getMost(most))
      .reduce((c, p) => c + p, 0);
    return result;
  }
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    // WRITE SOLUTION FOR TEST 1
    const terminalOutput = this.input.trim().split('\n');
    console.log(terminalOutput);

    const rootDir = new Directory('/');
    let currentDir = rootDir;

    terminalOutput.forEach((line) => {
      const cd = /\$ cd (?<dir>.+)/g.exec(line);
      if (cd?.groups?.dir) {
        if (cd?.groups?.dir === '/') {
          console.log('cd', cd?.groups?.dir);
          currentDir = rootDir;
        } else if (cd?.groups?.dir === '..') {
          console.log('cd ..', currentDir.parent.name);
          currentDir = currentDir.parent;
        } else {
          const dir = currentDir.content.find(
            (d) => d.name === cd?.groups?.dir
          ) as Directory;
          if (dir) {
            console.log('cd', dir.name);
            currentDir = dir;
          }
        }
      } else {
        const dir = /dir (?<name>\S+)/g.exec(line);
        const file = /(?<size>\d+) (?<name>\S+)/g.exec(line);
        if (dir?.groups?.name) {
          if (!currentDir.content.find((e) => e.name === dir?.groups?.name)) {
            console.log('dir', dir?.groups?.name);
            currentDir.content.push(
              new Directory(dir?.groups?.name, currentDir)
            );
          }
        } else if (file?.groups?.name) {
          console.log(
            'file in',
            currentDir.name,
            file?.groups?.name,
            file?.groups?.size
          );
          currentDir.content.push(
            new File(file?.groups?.name, +file?.groups?.size)
          );
        }
      }
    });

    console.log('Root size', rootDir.size);

    const result = rootDir.getMost(100000);

    return `day 7 solution 1: ${result}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 7 solution 1: 1428881';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 7 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 7 solution 2';
  }
}
