export const CMD = {
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  cat: 'cat',
  add: 'add',
  rn: 'rn',
  cp: 'cp',
  mv: 'mv',
  rm: 'rm',
  os: 'os',
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
  exit: 'exit',
}

export const COMMANDS = {
  [CMD.up]: ['up'],
  [CMD.cd]: ['cd'],
  [CMD.ls]: ['ls', 'list'],
  [CMD.cat]: ['cat'],
  [CMD.add]: ['add'],
  [CMD.rn]: ['rn', 'rename'],
  [CMD.cp]: ['cp', 'copyfile'],
  [CMD.mv]: ['mv', 'move'],
  [CMD.rm]: ['rm', 'remove'],
  [CMD.os]: ['os', 'system'],
  [CMD.hash]: ['hash'],
  [CMD.compress]: ['compress', 'zip'],
  [CMD.decompress]: ['decompress', 'unzip'],
  [CMD.exit]: ['.exit', '.e', '.q'],
}

const commands = Object.entries(COMMANDS)

export const getCommand = (cmd = '') => {
  const cmdToLowerCase = cmd?.toLowerCase?.() || ''
  return commands.find(([_, values]) => values.includes(cmdToLowerCase))?.[0] || cmd
}

export const OS_COMMANDS = {
  eol: ['--eol'],
  cpus: ['--cpus'],
  homedir: ['--homedir'],
  username: ['--username'],
  architecture: ['--architecture', '--arch'],
}

const osCommands = Object.entries(OS_COMMANDS)
export const osAvailableCommands = Object.values(OS_COMMANDS)

export const getOsCommand = (cmd = '') => {
  const cmdToLowerCase = cmd?.toLowerCase?.() || ''
  return osCommands.find(([_, values]) => values.includes(cmdToLowerCase))?.[0] || undefined
}
