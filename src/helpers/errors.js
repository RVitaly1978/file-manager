class BaseError extends Error {
  constructor (description, name) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    Error.captureStackTrace(this)
  }
}

export class InputError extends BaseError {
  constructor(description, name = 'Invalid input') {
    super(['Invalid input', description].join('. '), name)
  }
}

export class OperationError extends BaseError {
  constructor(description, name = 'Operation failed') {
    super(['Operation failed', description].join('. '), name)
  }
}
