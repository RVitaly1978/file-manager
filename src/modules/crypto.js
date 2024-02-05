import { pipeline } from 'node:stream/promises'
import { createReadStream } from 'node:fs'
import { createHash } from 'node:crypto'
import { blue, yellow, OperationError} from '../helpers/index.js'

export const logHash = async (src) => {
  const hash = createHash('sha256')
  try {
    await pipeline(createReadStream(src), hash)
    console.log(`Hash of file ${yellow(src)} is ${yellow(hash.digest('hex'))}`)
  } catch {
    throw new OperationError(`The source file path ${blue(src)} is not valid`)
  }
}
