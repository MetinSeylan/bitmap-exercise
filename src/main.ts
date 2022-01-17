import { Config } from './config';
import { Reader } from './reader';
import { Calculator } from './calculator';

/**
 * Application Context
 */
(function main() {
  const config = new Config().validate();
  const input = new Reader(config).read();
  const calculator = new Calculator(input);
  const output = calculator.getResult();

  console.log('Output:');
  console.table(output);
})();
