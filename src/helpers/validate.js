import { blue, INVALID_ARGUMENTS_NUMBER, INVALID_FILE_NAME, UNKNOWN_COMMAND, NO_ARGUMENT, INVALID_ARGUMENTS } from './log.js'
import { CMD, osAvailableCommands, getOsCommand } from './commands.js'

const validateArgsLength = (args, length = 0) => {
  if (args.length === length) { return true }
  if (!args.length) { return NO_ARGUMENT}
  return [INVALID_ARGUMENTS_NUMBER, args.map(blue).join(', ')].join(': ')
}

const maybeDirRegexp = /\/|\\/g
const validateIsFilename = (filename) => {
  if (!maybeDirRegexp.test(filename)) { return true }
  return `${INVALID_FILE_NAME}: ${blue(filename)}`
}

const OS_CMDs = `Available arguments: ${
  osAvailableCommands
    .map(([main, ...variants]) => !variants.length ? blue(main) : `${blue(main)} (${variants.map(blue).join(', ')})`)
    .join(', ')
}`

const validateOsCommand = (args) => {
  const [cmd, ...extra] = args
  if (getOsCommand(cmd) && !extra.length) { return true }
  if (!cmd) { return [NO_ARGUMENT, OS_CMDs].join('. ')}
  return [INVALID_ARGUMENTS, OS_CMDs].join('. ')
}

export const validate = (command, args) => {
  let argLengthValidation

  switch (command) {
    case CMD.up:
    case CMD.ls:
      return validateArgsLength(args, 0)

    case CMD.cd:
    case CMD.cat:
    case CMD.rm:
    case CMD.hash:
      return validateArgsLength(args, 1)

    case CMD.cp:
    case CMD.mv:
    case CMD.compress:
    case CMD.decompress:
      return validateArgsLength(args, 2)

    case CMD.os:
      return validateOsCommand(args)

    case CMD.add:
      argLengthValidation = validateArgsLength(args, 1)
      return argLengthValidation !== true ? argLengthValidation : validateIsFilename(args[0])

    case CMD.rn:
      argLengthValidation = validateArgsLength(args, 2)
      return argLengthValidation !== true ? argLengthValidation : validateIsFilename(args[1])

    case CMD.exit:
      return true

    default:
      return `${UNKNOWN_COMMAND}: ${blue(command)}`
  }
}
