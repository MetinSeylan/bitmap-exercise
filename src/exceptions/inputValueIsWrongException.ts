export class InputValueIsWrongException extends Error {
  private readonly code = 4;
  private payload: Record<any, any>;

  constructor(message, payload) {
    super(message);
    this.payload = payload;
  }
}
