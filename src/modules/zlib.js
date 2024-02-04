import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'
import { resolve } from 'node:path'
import {
  blue, OperationError, MSG, checkIsPathExist, getBaseFromPath, getExtFromPath, getNameFromPath, isExistAndFile,
} from '../helpers/index.js'

const ACTION = {
  compress: 'COMPRESS',
  decompress: 'DECOMPRESS',
}

const getCompressPaths = async (src, destPath) => {
  if (!(await isExistAndFile(src))) { throw new Error(`The entered path ${blue(src)} doesn't exist or is not a file`) }
  const destExt = getExtFromPath(destPath)
  const dest = destExt ? destPath : resolve(destPath, `${getBaseFromPath(src)}.br`)
  if (await checkIsPathExist(dest)) { throw new Error(`The destination path ${blue(dest)} already exists`) }
  return { src, dest }
}

const getDecompressPaths = async (src, destPath) => {
  if (!(await isExistAndFile(src))) { throw new Error(`The entered path ${blue(src)} doesn't exist or is not a file`) }
  const destExt = getExtFromPath(destPath)
  const filename = getExtFromPath(src) === '.br' ? getNameFromPath(src) : getBaseFromPath(src)
  const dest = destExt ? destPath : resolve(destPath, filename)
  if (await checkIsPathExist(dest)) { throw new Error(`The destination path ${blue(dest)} already exists`) }
  return { src, dest }
}

const makeBrotli = async (src, dest, action) => {
  const brotli = action === ACTION.compress ? createBrotliCompress() : createBrotliDecompress()
  try {
    await pipeline( createReadStream(src), brotli, createWriteStream(dest, { flags: 'wx' }))
  } catch {
    throw new Error()
  }
}

export const compressBrotli = async (srcPath, destPath) => {
  try {
    const { src, dest } = await getCompressPaths(srcPath, destPath)
    await makeBrotli(src, dest, ACTION.compress)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}

export const decompressBrotli = async (srcPath, destPath) => {
  try {
    const { src, dest } = await getDecompressPaths(srcPath, destPath)
    await makeBrotli(src, dest, ACTION.decompress)
    console.log(MSG.operationSuccessful)
  } catch (err) {
    throw new OperationError(err.message)
  }
}
