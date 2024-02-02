const logColor = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  lightGreen: '\x1b[92m',
  end: '\x1b[0m',
}

export const PROMPT_MSG = `${logColor.lightGreen}>${logColor.end} `

export const logGreeting = (username) => {
  const msg = `Welcome to the File Manager, ${logColor.green}${username}${logColor.end}!`
  console.log(msg)
}

export const logGoodbye = (username) => {
  const msg = `Thank you for using File Manager, ${logColor.green}${username}${logColor.end}, goodbye!`
  console.log(msg)
}

export const logCurrentWorkingDirectory = (workingDirectoryPath) => {
  const msg = `You are currently in ${logColor.yellow}${workingDirectoryPath}${logColor.end}`
  console.log(msg)
}
