import { rm } from 'node:fs/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib'
import { resolve } from 'node:path'
import { getPathBase, getPathExt, getPathName, cmdLogger, isExistAndFileOrFail, isPathNotExistOrFail } from '../helpers/index.js'

const ACTION = {
  compress: 'COMPRESS',
  decompress: 'DECOMPRESS',
}

const getCompressPaths = async (src, destPath) => {
  await isExistAndFileOrFail(src)
  const destExt = getPathExt(destPath)
  const dest = destExt ? destPath : resolve(destPath, `${getPathBase(src)}.br`)
  await isPathNotExistOrFail(dest)
  return { src, dest }
}

const getDecompressPaths = async (src, destPath) => {
  await isExistAndFileOrFail(src)
  const destExt = getPathExt(destPath)
  const filename = getPathExt(src) === '.br' ? getPathName(src) : getPathBase(src)
  const dest = destExt ? destPath : resolve(destPath, filename)
  await isPathNotExistOrFail(dest)
  return { src, dest }
}

const performBrotli = async (src, dest, action) => {
  const brotli = action === ACTION.compress ? createBrotliCompress() : createBrotliDecompress()
  try {
    await pipeline(createReadStream(src), brotli, createWriteStream(dest, { flags: 'wx' }))
  } catch (err) {
    await rm(dest, { force: true })
    throw new Error(err.message)
  }
}

export const compressBrotli = cmdLogger(
  async (srcPath, destPath) => {
    const { src, dest } = await getCompressPaths(srcPath, destPath)
    await performBrotli(src, dest, ACTION.compress)
  },
  true
)

export const decompressBrotli = cmdLogger(
  async (srcPath, destPath) => {
    const { src, dest } = await getDecompressPaths(srcPath, destPath)
    await performBrotli(src, dest, ACTION.decompress)
  },
  true
)
