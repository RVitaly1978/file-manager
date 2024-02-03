import { homedir, userInfo, EOL, cpus, arch } from 'node:os'

import * as h from '../helpers/index.js'

const COMMANDS = {
  eol: ['--eol'],
  cpus: ['--cpus'],
  homedir: ['--homedir'],
  username: ['--username'],
  architecture: ['--architecture', '--arch'],
}

const commands = Object.entries(COMMANDS)

const getCommand = (cmd = '') => {
  const cmdToLowerCase = cmd?.toLowerCase?.() || ''
  return commands.find(([_, values]) => values.includes(cmdToLowerCase))?.[0] || ''
}

export const eol = EOL

export const getHomedir = () => homedir()

export const getUsername = () => userInfo().username

const getArchitecture = () => arch()

const getCpus = () => cpus().map(item => ({ Model: item.model, Rate: item.speed }))

const processCommand = {
  eol () {
    console.log(`System EOL marker: ${h.yellow(JSON.stringify(EOL))}`)
  },
  cpus () {
    const cpus = getCpus()
    const formattedCpus = cpus.map(({ Model, Rate }) => ({ Model: Model.trim(), Rate: `${Rate / 1000} GHz` }))
    console.log(`Overall amount of logical CPU cores: ${h.yellow(cpus.length)}`)
    console.table(formattedCpus)
  },
  homedir () {
    console.log(`Current user's home directory: ${h.yellow(getHomedir())}`)
  },
  username () {
    console.log(`Current user name: ${h.yellow(getUsername())}`)
  },
  architecture () {
    console.log(`Operating system CPU architecture: ${h.yellow(getArchitecture())}`)
  }
}

export const logSystemInfo = (command) => {
  const cmd = getCommand(command)
  if (cmd) {
    processCommand[cmd]()
  } else {
    throw new h.InputError(`Available commands: ${h.blue('--eol')}, ${h.blue('--cpus')}, ${h.blue('--homedir')}, ${h.blue('--username')}, ${h.blue('--architecture')} (${h.blue('--arch')})`)
  }
}
