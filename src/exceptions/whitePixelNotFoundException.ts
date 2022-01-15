export class WhitePixelNotFoundException extends Error {
  private readonly code = 1;

  constructor() {
    super('white pixel not found.');
  }
}
