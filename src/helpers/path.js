import { parse } from 'node:path'
import { blue } from './log.js'
import { isExistAndFile, isExistAndDirectory, isPathExist } from './stats.js'

export const getPathDir = (path) => parse(path).dir
export const getPathBase = (path) => parse(path).base
export const getPathName = (path) => parse(path).name
export const getPathExt = (path) => parse(path).ext

export const isPathNotExistOrFail = async (src, type = 'destination') => {
  const isTrue = await isPathExist(src)
  if (isTrue) {
    throw new Error(`The ${type} path ${blue(src)} already exists`)
  }
}

export const isExistAndFileOrFail = async (src, type = 'source') => {
  const isTrue = await isExistAndFile(src)
  if (!isTrue) {
    throw new Error(`The ${type} path ${blue(src)} doesn't exist or is not a file`)
  }
}

export const isExistAndDirectoryOrFail = async (src, type = 'destination') => {
  const isTrue = await isExistAndDirectory(src)
  if (!isTrue) {
    throw new Error(`The ${type} path ${blue(src)} doesn't exist or is not a directory`)
  }
}

export const isFilenameOrFail = (filename) => {
  const { root, dir } = parse(filename)
  if (root || dir) {
    throw new Error(`Invalid destination file name ${blue(filename)} received`)
  }
}
