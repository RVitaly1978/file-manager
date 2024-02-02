export const COMMANDS = {
  up: ['up'],
  cd: ['cd'],
  ls: ['ls', 'list'],
  cat: ['cat'],
  add: ['add'],
  rn: ['rn', 'rename'],
  cp: ['cp', 'copyfile'],
  mv: ['mv', 'move'],
  rm: ['rm', 'remove'],
  os: ['os', 'system'],
  hash: ['hash'],
  compress: ['compress', 'zip'],
  decompress: ['decompress', 'unzip'],
  exit: ['.exit', '.e', '.q'],
}

const commands = Object.entries(COMMANDS)

export const getCommand = (cmd = '') => {
  const cmdToLowerCase = cmd?.toLowerCase?.() || ''
  return commands.find(([_, values]) => values.includes(cmdToLowerCase))?.[0] || ''
}
