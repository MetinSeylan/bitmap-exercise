import { Config } from './config';
import { Reader } from './reader';

const config = new Config();
config.validate();

const reader = new Reader(config);
reader.read();
