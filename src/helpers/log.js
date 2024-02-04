const c = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  lightGreen: '\x1b[92m',
  lightBlue: '\x1b[94m',
  end: '\x1b[0m',
}

export const green = (str) => `${c.green}${str}${c.end}`
export const red = (str) => `${c.red}${str}${c.end}`
export const blue = (str) => `${c.blue}${str}${c.end}`
export const yellow = (str) => `${c.yellow}${str}${c.end}`
export const lGreen = (str) => `${c.lightGreen}${str}${c.end}`
export const lBlue = (str) => `${c.lightBlue}${str}${c.end}`

export const PROMPT_MSG = `${lBlue('>')} `

export const logGreeting = (username) => {
  console.log(`Welcome to the File Manager, ${green(username)}!`)
}

export const logGoodbye = (username) => {
  console.log(`Thank you for using File Manager, ${green(username)}, goodbye!`)
}

export const logCurrentWorkingDirectory = (path) => {
  console.log(`You are currently in ${yellow(path)}`)
}

export const OPERATION_SUCCESSFUL = 'Operation completed successfully'
export const INVALID_INPUT = 'Invalid input'
export const OPERATION_FAILED = 'Operation failed'
export const INVALID_ARGUMENTS_NUMBER = 'Received invalid number of arguments'
export const INVALID_FILE_NAME = 'Received invalid file name'
export const UNKNOWN_COMMAND = 'Unknown command entered'
export const NO_ARGUMENT = 'No argument received'
export const INVALID_ARGUMENTS = 'Received invalid arguments'
