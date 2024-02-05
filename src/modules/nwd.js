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

const safeCheck = (cb) => {
  try {
    cb()
    return true
  } catch {
    return false
  }
}

export const listDir = async (cwd) => {
  try {
    const items = await readdir(cwd, { withFileTypes: true })

    const availableItems = items.filter(item => safeCheck(() => item.isDirectory()))
      .sort((a, b) => a.name.localeCompare(b.name))

    const dirs = availableItems.filter(item => item.isDirectory())
      .map(item => ({ Name: item.name, Type: 'directory' }))

    const files = availableItems.filter(item => item.isFile())
      .map(item => ({ Name: item.name, Type: 'file' }))

    const links = availableItems.filter(item => item.isSymbolicLink())
      .map(item => ({ Name: item.name, Type: 'symbolic link' }))

    console.table([...dirs, ...files, ...links])
  } catch (err) {
    throw new OperationError(err.message)
  }
}
