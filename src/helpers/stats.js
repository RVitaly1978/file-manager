import { stat } from 'node:fs/promises'
import { parse } from 'node:path'

export const getDirFromPath = (path) => parse(path).dir
export const getBaseFromPath = (path) => parse(path).base
export const getNameFromPath = (path) => parse(path).name
export const getExtFromPath = (path) => parse(path).ext

export const isExistAndDirectory = async (path) => {
  try {
    return (await stat(path)).isDirectory()
  } catch {
    return false
  }
}

export const isExistAndFile = async (path) => {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

export const checkIsPathExist = async (path) => {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}
