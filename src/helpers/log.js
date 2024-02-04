const ansiCodes = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  lightGreen: '\x1b[92m',
  lightBlue: '\x1b[94m',
  end: '\x1b[0m',
}

export const green = (str) => `${ansiCodes.green}${str}${ansiCodes.end}`
export const red = (str) => `${ansiCodes.red}${str}${ansiCodes.end}`
export const blue = (str) => `${ansiCodes.blue}${str}${ansiCodes.end}`
export const yellow = (str) => `${ansiCodes.yellow}${str}${ansiCodes.end}`
export const lGreen = (str) => `${ansiCodes.lightGreen}${str}${ansiCodes.end}`
export const lBlue = (str) => `${ansiCodes.lightBlue}${str}${ansiCodes.end}`

export const logGreeting = (username) => {
  console.log(`Welcome to the File Manager, ${green(username)}!`)
}

export const logGoodbye = (username) => {
  console.log(`Thank you for using File Manager, ${green(username)}, goodbye!`)
}

export const logCWD = (path) => {
  console.log(`You are currently in ${yellow(path)}`)
}

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
