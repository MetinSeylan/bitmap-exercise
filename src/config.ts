import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigValueIsWrongException } from './exceptions/configValueIsWrongException';

export class Config {
  private environment: Record<string, number>;

  private readonly validationRules = Joi.object().keys({
    BITMAP_MIN_SIZE: Joi.number().positive().required(),
    BITMAP_MAX_SIZE: Joi.number().positive().greater(Joi.ref('BITMAP_MIN_SIZE')).required(),
    CASE_MIN_SIZE: Joi.number().positive().required(),
    CASE_MAX_SIZE: Joi.number().positive().greater(Joi.ref('CASE_MIN_SIZE')).required(),
  });

  constructor() {
    dotenv.config();
    this.validate();
  }

  private validate(): void {
    const { error, value } = this.validationRules.validate(process.env, {
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      throw new ConfigValueIsWrongException(error.details);
    }

    this.environment = value;
  }

  public getBitmapMin(): number {
    return this.environment['BITMAP_MIN_SIZE'];
  }

  public getBitmapMax(): number {
    return this.environment['BITMAP_MAX_SIZE'];
  }

  public getCaseMin(): number {
    return this.environment['CASE_MIN_SIZE'];
  }

  public getCaseMax(): number {
    return this.environment['CASE_MAX_SIZE'];
  }
}
