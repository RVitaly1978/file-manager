const c = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  lightGreen: '\x1b[92m',
  end: '\x1b[0m',
}

export const green = (str) => `${c.green}${str}${c.end}`
export const red = (str) => `${c.red}${str}${c.end}`
export const blue = (str) => `${c.blue}${str}${c.end}`
export const yellow = (str) => `${c.yellow}${str}${c.end}`
export const lGreen = (str) => `${c.lightGreen}${str}${c.end}`

export const PROMPT_MSG = `${lGreen('>')} `

export const logGreeting = (username) => {
  console.log(`Welcome to the File Manager, ${green(username)}!`)
}

export const logGoodbye = (username) => {
  console.log(`Thank you for using File Manager, ${green(username)}, goodbye!`)
}

export const logCurrentWorkingDirectory = (path) => {
  console.log(`You are currently in ${yellow(path)}`)
}
