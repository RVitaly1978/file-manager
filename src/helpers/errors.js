import { OPERATION_FAILED } from './log.js'

class BaseError extends Error {
  constructor (description, name) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    Error.captureStackTrace(this)
  }
}

export class OperationError extends BaseError {
  constructor(description, name = OPERATION_FAILED) {
    super([OPERATION_FAILED, description].join('. '), name)
  }
}
