import { stat } from 'node:fs/promises'

export const isDirectory = async (path) => {
  const stats = await stat(path)
  return stats.isDirectory()
}
