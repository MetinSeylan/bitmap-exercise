import * as LineByLine from 'n-readlines';
import { Config } from './config';
import * as Joi from 'joi';
import { InputValueIsWrongException } from './exceptions/inputValueIsWrongException';
import {Input} from "./models/Input";

export class Reader {
  private testCase: number;
  private rowSize: number;
  private columnSize: number;
  private inputList: Array<Array<number>> = [];

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
          this.readLine(line.toString());
      }

      lineNumber++;
    }

    if (this.inputList.length !== this.rowSize) {
      throw new InputValueIsWrongException(
        `matrix input row count is wrong. should be ${this.rowSize}`,
        this.rowSize,
      );
    }

    console.log('Test Case:  ', this.testCase);
    console.log('Row Size:   ', this.rowSize);
    console.log('Column Size:', this.columnSize);
    console.log('Input:');
    console.table(this.inputList);

    return {
      rowSize: this.rowSize,
      columnSize: this.columnSize,
      testCase: this.testCase,
      inputList: this.inputList
    }
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

  private readLine(line: string): void {
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

    this.inputList.push([...value].map((s) => Number(s)));
  }
}
