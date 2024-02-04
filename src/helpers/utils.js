import { getCommand } from './commands.js'
import { getUsername } from '../modules/index.js'

export const getSessionUsername = () => {
  const defaultUser = getUsername()
  const ANONYMOUS = 'Anonymous'

  const args = process.argv.slice(2)
  if (args.length === 1) {
    const [flag, username] = args[0].split('=')
    if (flag === '--username') { return username || ANONYMOUS }
  } else if (args.length === 2) {
    const [flag, username] = args
    if (flag === '--username') { return username }
  }

  return defaultUser
}

const quoteRegex = /"|'/g
const quotesRegex = /[^\s"']+|"([^"]*)"+|'([^']*)'/gmi

export const parseRawInput = (input = '') => {
  if (!input) { return ['', []] }

  const [rawCommand, ...rawArgs] = input.trim().split(' ')
  const command = getCommand(rawCommand)

  if (!rawArgs.length) { return [command, []] }

  const argsStr = rawArgs.join(' ')
  if (!quoteRegex.test(argsStr)) { return [command, rawArgs] }

  const args = argsStr.match(quotesRegex).map(item => item.replace(quoteRegex, ''))
  return [command, args]
}
