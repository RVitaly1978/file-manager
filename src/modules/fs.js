import { pipeline } from 'node:stream/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import { writeFile, rename, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { EOL } from 'node:os'
import {
  blue, OperationError, MSG, getDirFromPath, checkIsPathExist, getBaseFromPath, isExistAndFile, isExistAndDirectory,
} from '../helpers/index.js'

const copyFileSilently = async (src, destDir) => {
  if (!(await isExistAndFile(src))) { throw new Error(`The entered path ${blue(src)} doesn't exist or is not a file`) }
  if (!(await isExistAndDirectory(destDir))) { throw new Error(`The destination directory path ${blue(destDir)} doesn't exist or is not a directory`) }
  const base = getBaseFromPath(src)
  const dest = resolve(destDir, base)
  if (await isExistAndFile(dest)) { throw new Error(`File with name ${blue(base)} already exists in the directory ${blue(destDir)}`) }
  try {
    await pipeline(createReadStream(src), createWriteStream(dest, { flags: 'wx' }))
  } catch (err) {
    throw new Error(err.message)
  }
}

const removeFileSilently = async (src) => {
  try {
    await rm(src)
  } catch {
    throw new Error(`The entered path to file ${blue(src)} is not valid`)
  }
}

export const copyFile = async (src, dest) => {
  try {
    await copyFileSilently(src, dest)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const moveFile = async (src, dest) => {
  try {
    await copyFileSilently(src, dest)
    await removeFileSilently(src)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const removeFile = async (src) => {
  try {
    await removeFileSilently(src)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const readFile = async (src) => {
  try {
    const readable = createReadStream(src, 'utf8')
    await pipeline(readable, process.stdout, { end: false })
    process.stdout.write(EOL)
  } catch {
    throw new OperationError(`The entered file path ${blue(src)} is not valid`)
  }
}

export const addFile = async (src) => {
  try {
    await writeFile(src, '', { flag: 'wx' })
    console.log(MSG.operationSuccessful)
  } catch {
    throw new OperationError(`The entered path ${blue(src)} already exists in the directory ${blue(getDirFromPath(src))}`)
  }
}

export const renameFile = async (src, dest) => {
  if (await checkIsPathExist(dest)) {
    throw new OperationError(`The entered new filename ${blue(getBaseFromPath(dest))} already exists in the directory ${blue(getDirFromPath(dest))}`)
  }
  try {
    await rename(src, dest)
    console.log(MSG.operationSuccessful)
  } catch {
    throw new OperationError(`The entered path to file ${blue(src)} is not valid`)
  }
}
