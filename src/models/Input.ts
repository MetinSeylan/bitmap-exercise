import { Point } from './Point';

export declare type Output = Array<Array<number>>;

export class Input {
  constructor(
    public readonly testCase: number,
    public readonly rowSize: number,
    public readonly columnSize: number,
    public readonly inputList: Array<Array<Point>>,
  ) {}

  public toOutput(): Output {
    return this.inputList.map((row) => row.map((column) => column.distance));
  }

  public toObject(): Output {
    return this.inputList.map((row) => row.map((column) => column.color));
  }
}
