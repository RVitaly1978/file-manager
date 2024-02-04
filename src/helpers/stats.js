import { stat } from 'node:fs/promises'
import { parse } from 'node:path'

export const getDirFromPath = (path) => parse(path).dir
export const getBaseFromPath = (path) => parse(path).base
export const getNameFromPath = (path) => parse(path).name
export const getExtFromPath = (path) => parse(path).ext

export const isDirectory = async (path) => {
  const stats = await stat(path)
  return stats.isDirectory()
}

export const isFile = async (path) => {
  const stats = await stat(path)
  return stats.isFile()
}

export const checkIsPathExist = async (path) => {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}
