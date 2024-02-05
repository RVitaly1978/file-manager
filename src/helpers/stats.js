import { stat } from 'node:fs/promises'

const getStatOrFalse = (cd) => async (...args) => {
  try {
    return (await cd(...args))
  } catch {
    return false
  }
}

export const isExistAndDirectory = getStatOrFalse(async (path) => {
  const stats = await stat(path)
  return stats.isDirectory()
})

export const isExistAndFile = getStatOrFalse(async (path) => {
  const stats = await stat(path)
  return stats.isFile()
})

export const isPathExist = getStatOrFalse(async (path) => {
  await stat(path)
  return true
})
