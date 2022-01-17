import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigValueIsWrongException } from './exceptions/configValueIsWrongException';
dotenv.config();

export class Config {
  private environment: Record<string, number | string>;

  private readonly validationRules = Joi.object().keys({
    BITMAP_MIN_SIZE: Joi.number().positive().required(),
    BITMAP_MAX_SIZE: Joi.number()
      .positive()
      .greater(Joi.ref('BITMAP_MIN_SIZE'))
      .required(),
    CASE_MIN_SIZE: Joi.number().positive().required(),
    CASE_MAX_SIZE: Joi.number()
      .positive()
      .greater(Joi.ref('CASE_MIN_SIZE'))
      .required(),
    INPUT_FILE_PATH: Joi.string().required(),
  });

  public validate(): Config {
    const { error, value } = this.validationRules.validate(process.env, {
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      throw new ConfigValueIsWrongException(error.details);
    }

    this.environment = value;

    return this;
  }

  public getBitmapMin(): number {
    return this.environment['BITMAP_MIN_SIZE'] as number;
  }

  public getBitmapMax(): number {
    return this.environment['BITMAP_MAX_SIZE'] as number;
  }

  public getCaseMin(): number {
    return this.environment['CASE_MIN_SIZE'] as number;
  }

  public getCaseMax(): number {
    return this.environment['CASE_MAX_SIZE'] as number;
  }

  public getInputFilePath(): string {
    return this.environment['INPUT_FILE_PATH'] as string;
  }
}
