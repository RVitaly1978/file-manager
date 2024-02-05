import { OperationError } from './errors.js'

const ansiCodes = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  lightGreen: '\x1b[92m',
  lightYellow: '\x1b[93m',
  lightBlue: '\x1b[94m',
  end: '\x1b[0m',
}

export const green = (str) => `${ansiCodes.green}${str}${ansiCodes.end}`
export const red = (str) => `${ansiCodes.red}${str}${ansiCodes.end}`
export const blue = (str) => `${ansiCodes.blue}${str}${ansiCodes.end}`
export const yellow = (str) => `${ansiCodes.yellow}${str}${ansiCodes.end}`
export const lYellow = (str) => `${ansiCodes.lightYellow}${str}${ansiCodes.end}`
export const lGreen = (str) => `${ansiCodes.lightGreen}${str}${ansiCodes.end}`
export const lBlue = (str) => `${ansiCodes.lightBlue}${str}${ansiCodes.end}`

export const MSG = {
  terminalPrompt: `${lBlue('>')} `,
  operationSuccessful: 'Operation completed successfully',
  invalidInput: 'Invalid input',
  operationFailed: 'Operation failed',
  invalidArgsNumber: 'Received invalid number of arguments',
  invalidFilename: 'Received invalid file name',
  unknownCommand: 'Unknown command entered',
  noArgument: 'No argument received',
  invalidArgs: 'Received invalid arguments',
}

export const logGreeting = (username) => {
  console.log(`${green('Welcome to the File Manager,')} ${lGreen(username)}${green('!')}`)
}

export const logGoodbye = (username) => {
  console.log(`${green('Thank you for using File Manager,')} ${lGreen(username)}${green(', goodbye!')}`)
}

export const logCWD = (path) => {
  console.log(`You are currently in ${lBlue(path)}`)
}

export const cmdLogger = (cb, isLogSuccess) => async (...args) => {
  try {
    await cb(...args)
    if (isLogSuccess) {
      console.log(MSG.operationSuccessful)
    }
  } catch (err) {
    throw new OperationError(err.message)
  }
}
