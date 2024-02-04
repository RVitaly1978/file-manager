import { blue, MSG } from './log.js'
import { CMD, osAvailableCommands, getOsCommand } from './commands.js'

const validateArgsLength = (args, length = 0) => {
  if (args.length === length) { return true }
  if (!args.length) { return MSG.noArgument}
  return [MSG.invalidArgsNumber, args.map(blue).join(', ')].join(': ')
}

const maybeDirRegexp = /\/|\\/g
const validateIsFilename = (filename) => {
  if (!maybeDirRegexp.test(filename)) { return true }
  return `${MSG.invalidFilename}: ${blue(filename)}`
}

const OS_CMDs = `Available arguments: ${
  osAvailableCommands
    .map(([main, ...variants]) => !variants.length ? blue(main) : `${blue(main)} (${variants.map(blue).join(', ')})`)
    .join(', ')
}`

const validateOsCommand = (args) => {
  const [cmd, ...extra] = args
  if (getOsCommand(cmd) && !extra.length) { return true }
  if (!cmd) { return [MSG.noArgument, OS_CMDs].join('. ')}
  return [MSG.invalidArgs, OS_CMDs].join('. ')
}

export const validate = (command, args) => {
  let argsLengthValidation

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
      argsLengthValidation = validateArgsLength(args, 1)
      return argsLengthValidation !== true ? argsLengthValidation : validateIsFilename(args[0])

    case CMD.rn:
      argsLengthValidation = validateArgsLength(args, 2)
      return argsLengthValidation !== true ? argsLengthValidation : validateIsFilename(args[1])

    case CMD.exit:
      return true

    default:
      return `${MSG.unknownCommand}: ${blue(command)}`
  }
}
