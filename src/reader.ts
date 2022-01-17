import * as LineByLine from 'n-readlines';
import { Config } from './config';
import * as Joi from 'joi';
import { InputValueIsWrongException } from './exceptions/inputValueIsWrongException';
import { Input } from './models/Input';
import { Point } from './models/Point';
import { Color } from './models/color';
import { WhitePixelNotFoundException } from './exceptions/whitePixelNotFoundException';

export class Reader {
  private testCase: number;
  private rowSize: number;
  private columnSize: number;
  private inputList: Array<Array<Point>> = [];

  constructor(private readonly config: Config) {}

  public read(): Input {
    const inputStream = new LineByLine(this.config.getInputFilePath());

    let line;
    let lineNumber = 0;

    while ((line = inputStream.next())) {
      switch (lineNumber) {
        case 0:
          this.readTestCase(line.toString());
          break;
        case 1:
          this.readRowColumnSize(line.toString());
          break;
        default:
          this.readLine(line.toString(), lineNumber - 2);
      }

      lineNumber++;
    }

    this.validateRowSize();

    const input = new Input(
      this.testCase,
      this.rowSize,
      this.columnSize,
      this.inputList,
    );

    const inputObject = input.toObject();
    this.validateWhitePixel(inputObject);

    console.log('Test Case:  ', this.testCase);
    console.log('Row Size:   ', this.rowSize);
    console.log('Column Size:', this.columnSize);
    console.log('Input:');
    console.table(inputObject);

    return input;
  }

  private readTestCase(line: string): void {
    const { error, value } = Joi.number()
      .positive()
      .min(this.config.getCaseMin())
      .max(this.config.getCaseMax())
      .validate(line, {
        convert: true,
      });

    if (error) {
      throw new InputValueIsWrongException(
        'number of test cases value is wrong.',
        error.details,
      );
    }

    this.testCase = value;
  }

  private readRowColumnSize(line: string): void {
    const { error, value } = Joi.string()
      .required()
      .regex(/^[0-9\s]*$/)
      .validate(line);

    if (error) {
      throw new InputValueIsWrongException(
        'row and column size inputList is wrong.',
        error.details,
      );
    }

    const partial = value.split(' ');
    this.rowSize = Number(partial[0]);
    this.columnSize = Number(partial[1]);
  }

  private readLine(line: string, rowIndex: number): void {
    const { error, value } = Joi.string()
      .required()
      .regex(/[0-1]+/)
      .length(this.columnSize)
      .validate(line);

    if (error) {
      throw new InputValueIsWrongException(
        'matrix inputList value is wrong.',
        error.details,
      );
    }

    const row = [];
    for (let i = 0; i < [...value].length; i++) {
      row.push(new Point(Number(value[i]) as Color, rowIndex, i));
    }
    this.inputList.push(row);
  }

  private validateWhitePixel(input: Array<Array<number>>) {
    if (!input.find((row) => row.find((column) => column))) {
      throw new WhitePixelNotFoundException();
    }
  }

  private validateRowSize() {
    if (this.inputList.length !== this.rowSize) {
      throw new InputValueIsWrongException(
        `matrix input row count is wrong. should be ${this.rowSize}`,
        this.rowSize,
      );
    }
  }
}
