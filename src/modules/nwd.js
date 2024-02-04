import { readdir } from 'node:fs/promises'
import { blue, isExistAndDirectory, OperationError } from '../helpers/index.js'

export const changeDir = async (path) => {
  try {
    if (!(await isExistAndDirectory(path))) { throw new Error() }
    return path
  } catch {
    throw new OperationError(`The entered path ${blue(path)} is not valid`)
  }
}

export const listDir = async (cwd) => {
  try {
    const items = await readdir(cwd, { withFileTypes: true })

    const dirs = items.filter(item => item.isDirectory())
      .map(item => ({ Name: item.name, Type: 'directory' }))
      .sort((a, b) => a.Name.localeCompare(b.Name))

    const files = items.filter(item => item.isFile())
      .map(item => ({ Name: item.name, Type: 'file' }))
      .sort((a, b) => a.Name.localeCompare(b.Name))

    const links = items.filter(item => item.isSymbolicLink())
      .map(item => ({ Name: item.name, Type: 'symbolic link' }))
      .sort((a, b) => a.Name.localeCompare(b.Name))

    console.table([...dirs, ...files, ...links])
  } catch {
    throw new OperationError()
  }
}
