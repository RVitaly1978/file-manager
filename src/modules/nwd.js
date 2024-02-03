import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

import * as h from '../helpers/index.js'

export const up = (cwd) => {
  return resolve(cwd, '..')
}

export const cd = async (cwd, pathTo) => {
  try {
    const path = resolve(cwd, pathTo)
    const isDirectory = await h.isDirectory(path)
    if (!isDirectory) { throw new Error() }
    return path
  } catch {
    throw new h.OperationError(`The entered path ${h.blue(pathTo)} is not valid`)
  }
}

export const list = async (cwd) => {
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

    const list = [...dirs, ...files, ...links]
    console.table(list)
  } catch {
    throw new h.OperationError()
  }
}
