import { Config } from '../../src/config';
import { Reader } from '../../src/reader';
import * as path from 'path';
import { Calculator } from '../../src/calculator';

describe('Calculator Test', () => {
  it('should calculate input file successfully', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() => path.resolve(__dirname, 'input.success'));
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);
    const input = reader.read();
    const calculator = new Calculator(input);

    // when
    const output = calculator.getResult();

    // then
    expect(output).toEqual([
      [3, 2, 1, 0],
      [2, 1, 0, 0],
      [1, 0, 0, 1],
    ]);
  });

  it('should calculate input file successfully', () => {
    // given
    const config = new Config();
    jest
      .spyOn(config, 'getInputFilePath')
      .mockImplementation(() => path.resolve(__dirname, 'input-case2.success'));
    jest.spyOn(config, 'getCaseMin').mockImplementation(() => 1);
    jest.spyOn(config, 'getCaseMax').mockImplementation(() => 1000);
    const reader = new Reader(config);
    const input = reader.read();
    const calculator = new Calculator(input);

    // when
    const output = calculator.getResult();

    // then
    expect(output).toEqual([
      [5, 4, 3, 2],
      [4, 3, 2, 1],
      [3, 2, 1, 0],
    ]);
  });
});
