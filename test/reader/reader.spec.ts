import { Config } from '../../src/config';
import { Reader } from '../../src/reader';
import * as path from 'path';

describe('Input Reader Test', () => {
  it('should read input file successfully', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() => path.resolve(__dirname, 'input.success'));
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);

    // when
    const input = reader.read();

    // then
    expect(input.testCase).toBe(1);
    expect(input.rowSize).toBe(3);
    expect(input.columnSize).toBe(4);
    expect(input.toObject()).toEqual([
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 1, 1, 0],
    ]);
  });

  it('throw exception when test case size input is wrong', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() =>
        path.resolve(__dirname, 'input-test-case-size.wrong'),
      );
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);

    // when
    // then
    expect(() => reader.read()).toThrow('number of test cases value is wrong.');
  });

  it('throw exception when column and row line is wrong', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() =>
        path.resolve(__dirname, 'input-column-size.wrong'),
      );
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);

    // when
    // then
    expect(() => reader.read()).toThrow(
      'row and column size inputList is wrong.',
    );
  });

  it('throw exception when input value is wrong', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() =>
        path.resolve(__dirname, 'input-line-value.wrong'),
      );
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);

    // when
    // then
    expect(() => reader.read()).toThrow('matrix inputList value is wrong.');
  });

  it('throw exception when white pixel is missing', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() =>
        path.resolve(__dirname, 'input-white-pixel.wrong'),
      );
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);

    // when
    // then
    expect(() => reader.read()).toThrow('white pixel not found.');
  });
});
