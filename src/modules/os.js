import { homedir, userInfo, EOL, cpus, arch } from 'node:os'

export const eol = EOL

export const getHomedir = () => homedir()

export const getUsername = () => userInfo().username

export const getEOL = () => {
  console.log(`${EOL}`)
}

export const getCpus = () => {
  const cpusFormatted = cpus()
    .map(item => ({
      Model: item.model
    }))
  console.table(cpusFormatted)
}

export const getUserInfo = () => {
  console.log(userInfo().username)
}

export const getArch = () => {
  console.log(arch())
}
