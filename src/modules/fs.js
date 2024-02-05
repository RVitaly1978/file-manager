import { pipeline } from 'node:stream/promises'
import { createReadStream, createWriteStream } from 'node:fs'
import { writeFile, rename, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { EOL } from 'node:os'
import {
  cmdLogger, getPathBase, getPathDir, getPathExt,
  isPathNotExistOrFail, isExistAndFileOrFail, isExistAndDirectoryOrFail, isFilenameOrFail,
} from '../helpers/index.js'

const getDestPathOrFail = async (src, destPath) => {
  if (getPathExt(destPath)) { // destPath is filePath
    const dir = getPathDir(destPath)
    await isExistAndDirectoryOrFail(dir)
    await isPathNotExistOrFail(destPath)
    return destPath
  } else { // destPath is directoryPath
    await isExistAndDirectoryOrFail(destPath)
    const base = getPathBase(src)
    const dest = resolve(destPath, base)
    await isPathNotExistOrFail(dest)
    return dest
  }
}

export const copyFile = cmdLogger(
  async (src, destPath) => {
    await isExistAndFileOrFail(src)
    const dest = await getDestPathOrFail(src, destPath)
    await pipeline(createReadStream(src), createWriteStream(dest, { flags: 'wx' }))
  },
  true
)

// solution with Streams API (task requirement)
export const moveFile = cmdLogger(
  async (src, destPath) => {
    await isExistAndFileOrFail(src)
    const dest = await getDestPathOrFail(src, destPath)
    await pipeline(createReadStream(src), createWriteStream(dest, { flags: 'wx' }))
    await rm(src)
  },
  true
)

// // solution with fs.rename (preferred)
// export const moveFile = cmdLogger(
//   async (src, destPath) => {
//     await isExistAndFileOrFail(src)
//     const dest = await getDestPathOrFail(src, destPath)
//     await rename(src, dest)
//   },
//   true
// )

export const removeFile = cmdLogger(
  async (src) => {
    await isExistAndFileOrFail(src)
    await rm(src)
  },
  true
)

export const readFile = cmdLogger(
  async (src) => {
    await isExistAndFileOrFail(src)
    await pipeline(createReadStream(src, 'utf8'), process.stdout, { end: false })
    process.stdout.write(EOL)
  }
)

export const addFile = cmdLogger(
  async (src) => {
    await isPathNotExistOrFail(src)
    await writeFile(src, '', { flag: 'wx' })
  },
  true
)

export const renameFile = cmdLogger(
  async (src, fileName) => {
    await isExistAndFileOrFail(src)
    isFilenameOrFail(fileName)
    const srcDir = getPathDir(src)
    const dest = resolve(srcDir, fileName)
    await isPathNotExistOrFail(dest)
    await rename(src, dest)
  },
  true
)
