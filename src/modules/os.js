import { homedir, userInfo, EOL, cpus, arch } from 'node:os'
import { yellow, getOsCommand } from '../helpers/index.js'

export const getHomedir = () => homedir()

export const getUsername = () => userInfo().username

const getArchitecture = () => arch()

const getCpus = () => cpus().map(item => ({ Model: item.model, Rate: item.speed }))

const processCommand = {
  eol () { console.log(`System EOL marker: ${yellow(JSON.stringify(EOL))}`) },
  homedir () { console.log(`Current user's home directory: ${yellow(getHomedir())}`) },
  username () { console.log(`Current user name: ${yellow(getUsername())}`) },
  architecture () { console.log(`Operating system CPU architecture: ${yellow(getArchitecture())}`) },
  cpus () {
    const cpus = getCpus()
    const formattedCpus = cpus.map(({ Model, Rate }) => ({ Model: Model.trim(), Rate: `${Rate / 1000} GHz` }))
    console.log(`Overall amount of logical CPU cores: ${yellow(cpus.length)}`)
    console.table(formattedCpus)
  },
}

export const logSystemInfo = (commandArg) => {
  const cmd = getOsCommand(commandArg)
  processCommand[cmd]()
}
