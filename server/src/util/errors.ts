export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 404;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class NotAuthError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 401;
    Object.setPrototypeOf(this, NotAuthError.prototype);
  }
}
