import { createInterface } from 'node:readline'
import { logGreeting, logGoodbye, logCWD, parseRawInput, validate, MSG } from './helpers/index.js'
import {
  changeDirUp, changeDir, listDir, // nwd
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
    this._cwd = changeDirUp(this._cwd)
  }

  async cd (args) {
    this._cwd = await changeDir(this._cwd, ...args)
  }

  async ls () {
    await listDir(this._cwd)
  }

  async cat (args) {
    await readFile(this._cwd, ...args)
  }

  async add (args) {
    await addFile(this._cwd, ...args)
  }

  async rn (args) {
    await renameFile(this._cwd, ...args)
  }

  async cp (args) {
    await copyFile(this._cwd, ...args)
  }

  async mv (args) {
    await moveFile(this._cwd, ...args)
  }

  async rm (args) {
    await removeFile(this._cwd, ...args)
  }

  os (args) {
    logSystemInfo(...args)
  }

  async hash (args) {
    await logHash(this._cwd, ...args)
  }

  async compress (args) {
    await compressBrotli(this._cwd, ...args)
  }

  async decompress (args) {
    await decompressBrotli(this._cwd, ...args)
  }

  exit () {
    this._rl.close()
  }

  parseInput (line) {
    return parseRawInput(line)
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
      const [command, args] = this.parseInput(line)

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
