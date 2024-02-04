import { pipeline } from 'node:stream/promises'
import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { blue, yellow, OperationError} from '../helpers/index.js'

export const logHash = async (cwd, pathToFile) => {
  const path = resolve(cwd, pathToFile)
  const hash = createHash('sha256')
  try {
    const readable = createReadStream(path)
    await pipeline(readable, hash)
    console.log(`Hash of file ${yellow(path)} is ${yellow(hash.digest('hex'))}`)
  } catch {
    throw new OperationError(`The entered file path ${blue(path)} is not valid`)
  }
}
