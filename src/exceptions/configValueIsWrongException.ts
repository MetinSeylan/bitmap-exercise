export class ConfigValueIsWrongException extends Error {
  private readonly code = 3;
  private payload: Record<any, any>;

  constructor(payload) {
    super('configuration value is wrong');
    this.payload = payload;
  }
}
