export class BitmapSizeWrongException extends Error {
  private readonly code = 2;

  constructor() {
    super('bitmap size should be between 1 and 182.');
  }
}
