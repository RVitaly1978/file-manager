import { pipeline } from 'node:stream/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import { writeFile, rename, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { EOL } from 'node:os'
import { blue, OperationError, MSG, getDirFromPath, checkIsPathExist, getBaseFromPath } from '../helpers/index.js'

const copyFileWithoutLog = async (cwd, pathToFile, pathToNewDir) => {
  const srcPath = resolve(cwd, pathToFile)
  const newDirPath = resolve(cwd, pathToNewDir)
  const base = getBaseFromPath(srcPath)
  const destPath = resolve(cwd, pathToNewDir, base)
  if (!(await checkIsPathExist(srcPath))) {
    throw new Error(`The entered path to file ${blue(srcPath)} doesn't exist`)
  }
  if (!(await checkIsPathExist(newDirPath))) {
    throw new Error(`The entered path ${blue(newDirPath)} to destination directory doesn't exist`)
  }
  if (await checkIsPathExist(destPath)) {
    throw new Error(`File with name ${blue(base)} already exists in the directory ${blue(newDirPath)}`)
  }
  await pipeline(createReadStream(srcPath), createWriteStream(destPath))
}

const removeFileWithoutLog = async (cwd, pathToFile) => {
  const path = resolve(cwd, pathToFile)
  try {
    await rm(path)
  } catch {
    throw new Error(`The entered path to file ${blue(path)} is not valid`)
  }
}

export const copyFile = async (cwd, pathToFile, pathToNewDir) => {
  try {
    await copyFileWithoutLog(cwd, pathToFile, pathToNewDir)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const moveFile = async (cwd, pathToFile, pathToNewDir) => {
  try {
    await copyFileWithoutLog(cwd, pathToFile, pathToNewDir)
    await removeFileWithoutLog(cwd, pathToFile)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const removeFile = async (cwd, pathToFile) => {
  try {
    await removeFileWithoutLog(cwd, pathToFile)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const readFile = async (cwd, path) => {
  try {
    const filePath = resolve(cwd, path)
    const readable = createReadStream(filePath, 'utf8')
    await pipeline(readable, process.stdout, { end: false })
    process.stdout.write(EOL)
  } catch {
    throw new OperationError(`The entered file path ${blue(path)} is not valid`)
  }
}

export const addFile = async (cwd, filename) => {
  try {
    const filePath = resolve(cwd, filename)
    await writeFile(filePath, '', { flag: 'wx' })
    console.log(MSG.operationSuccessful)
  } catch {
    throw new OperationError(`The entered file name ${blue(filename)} already exists in the current directory or is not valid`)
  }
}

export const renameFile = async (cwd, pathToFile, newFilename) => {
  const srcPath = resolve(cwd, pathToFile)
  const dirPath = getDirFromPath(srcPath)
  const destPath = resolve(dirPath, newFilename)
  if (await checkIsPathExist(destPath)) {
    throw new OperationError(`The entered new filename ${blue(newFilename)} already exists in the directory ${blue(dirPath)}`)
  }
  try {
    await rename(srcPath, destPath)
    console.log(MSG.operationSuccessful)
  } catch {
    throw new OperationError(`The entered path to file ${blue(srcPath)} is not valid`)
  }
}
