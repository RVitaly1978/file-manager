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

const PROGRAM_COMMANDS = {
  [CMD.up]: ['up'],
  [CMD.cd]: ['cd'],
  [CMD.ls]: ['ls', 'list'],
  [CMD.cat]: ['cat'],
  [CMD.add]: ['add'],
  [CMD.rn]: ['rn', 'rename'],
  [CMD.cp]: ['cp', 'copy'],
  [CMD.mv]: ['mv', 'move'],
  [CMD.rm]: ['rm', 'remove', 'del', 'delete'],
  [CMD.os]: ['os', 'system', 'sys'],
  [CMD.hash]: ['hash'],
  [CMD.compress]: ['compress', 'zip'],
  [CMD.decompress]: ['decompress', 'unzip'],
  [CMD.exit]: ['.exit', '.e', '.q'],
}

const programCommands = Object.entries(PROGRAM_COMMANDS)

export const getProgramCommand = (cmd = '') => {
  const cmdToLowerCase = cmd?.toLowerCase?.() || ''
  return programCommands.find(([_, values]) => values.includes(cmdToLowerCase))?.[0] || cmd
}

export const OS_COMMANDS = {
  eol: ['--eol', '--e'],
  cpus: ['--cpus', '--c'],
  homedir: ['--homedir', '--h'],
  username: ['--username', '-u'],
  architecture: ['--architecture', '--a'],
}

const osCommands = Object.entries(OS_COMMANDS)

export const getOsCommand = (cmd = '') => {
  const cmdToLowerCase = cmd?.toLowerCase?.() || ''
  return osCommands.find(([_, values]) => values.includes(cmdToLowerCase))?.[0] || undefined
}

export const osAvailableCommands = Object.values(OS_COMMANDS)
