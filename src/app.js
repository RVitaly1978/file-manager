import { createInterface } from 'node:readline'
import { resolve } from 'node:path'
import { logGreeting, logGoodbye, logCWD, parseRawInput, validate, MSG, getDirFromPath } from './helpers/index.js'
import {
  changeDir, listDir, // nwd
  readFile, addFile, renameFile, removeFile, copyFile, moveFile, // fs
  logHash, // crypto
  compressBrotli, decompressBrotli, // zlib
  logSystemInfo, // os
} from './modules/index.js'

export class App {
  constructor (sessionUserName, startDirectory) {
    this.sessionUserName = sessionUserName
    this._cwd = startDirectory
    this._rl = undefined
  }

  _resolvePath (path) {
    return resolve(this._cwd, path)
  }

  greeting () {
    logGreeting(this.sessionUserName)
  }

  goodbye () {
    logGoodbye(this.sessionUserName)
  }

  displayCWD () {
    logCWD(this._cwd)
  }

  displayPrompt () {
    this.displayCWD()
    this._rl.prompt()
  }

  up () {
    this._cwd = this._resolvePath('..')
  }

  async cd ([pathTo]) {
    const path = this._resolvePath(pathTo)
    this._cwd = await changeDir(path)
  }

  async ls () {
    await listDir(this._cwd)
  }

  async cat ([pathToFile]) {
    const path = this._resolvePath(pathToFile)
    await readFile(path)
  }

  async add ([filename]) {
    const path = this._resolvePath(filename)
    await addFile(path)
  }

  async rn ([pathToFile, newFilename]) {
    const srcPath = this._resolvePath(pathToFile)
    const dirPath = getDirFromPath(srcPath)
    const destPath = resolve(dirPath, newFilename)
    await renameFile(srcPath, destPath)
  }

  async cp ([pathToFile, pathToNewDir]) {
    const src = this._resolvePath(pathToFile)
    const dest = this._resolvePath(pathToNewDir)
    await copyFile(src, dest)
  }

  async mv ([pathToFile, pathToNewDir]) {
    const src = this._resolvePath(pathToFile)
    const dest = this._resolvePath(pathToNewDir)
    await moveFile(src, dest)
  }

  async rm ([pathToFile]) {
    const src = this._resolvePath(pathToFile)
    await removeFile(src)
  }

  os (args) {
    logSystemInfo(...args)
  }

  async hash ([pathToFile]) {
    const src = this._resolvePath(pathToFile)
    await logHash(src)
  }

  async compress ([pathToFile, pathToDest]) {
    const src = this._resolvePath(pathToFile)
    const dest = this._resolvePath(pathToDest)
    await compressBrotli(src, dest)
  }

  async decompress ([pathToFile, pathToDest]) {
    const src = this._resolvePath(pathToFile)
    const dest = this._resolvePath(pathToDest)
    await decompressBrotli(src, dest)
  }

  exit () {
    this._rl.close()
  }

  validateInput (command, args) {
    const res = validate(command, args)
    return res === true
      ? { value: true, message: '' }
      : { value: false, message: [MSG.invalidInput, res].join('. ') }
  }

  repl () {
    this._rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: MSG.terminalPrompt,
    })

    this._rl.on('line', async (line) => {
      const [command, args] = parseRawInput(line)

      if (!command) {
        this._rl.prompt()
        return
      }

      const validation = this.validateInput(command, args)

      if (validation.value) {
        try {
          await this[command](args)
        } catch (err) {
          console.log(err.message)
        }
      } else {
        console.log(validation.message)
      }

      this.displayPrompt()
    })

    this._rl.on('close', () => {
      process.exit()
    })

    this._rl.on('SIGINT', () => {
      console.log('')
      process.exit()
    })

    this.displayPrompt()
  }

  start () {
    this.greeting()

    process.on('exit', () => this.goodbye())

    process.on('error', (err) => console.log(err.message))

    this.repl()
  }
}
