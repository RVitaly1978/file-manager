import { readdir } from 'node:fs/promises'
import { isExistAndDirectoryOrFail, OperationError } from '../helpers/index.js'

export const changeDir = async (path) => {
  try {
    await isExistAndDirectoryOrFail(path)
    return path
  } catch (err) {
    throw new OperationError(err.message)
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
  } catch (err) {
    throw new OperationError(err.message)
  }
}
