import { createInterface } from 'node:readline'

import * as h from './helpers/index.js'
import * as m from './modules/index.js'

export class App {
  constructor (sessionUserName, startDirectory) {
    this.sessionUserName = sessionUserName
    this._cwd = startDirectory
    this._rl = undefined
  }

  greeting () {
    h.logGreeting(this.sessionUserName)
  }

  goodbye () {
    h.logGoodbye(this.sessionUserName)
  }

  logCWD () {
    h.logCurrentWorkingDirectory(this._cwd)
  }

  displayPrompt () {
    this.logCWD()
    this._rl.prompt()
  }

  up () {
    this._cwd = m.up(this._cwd)
  }

  async cd ([pathTo]) {
    this._cwd = await m.cd(this._cwd, pathTo)
  }

  async ls () {
    await m.list(this._cwd)
  }

  cat (args) {
    console.log('--cat--', args)
  }

  add (args) {
    console.log('--add--', args)
  }

  rn (args) {
    console.log('--rn--', args)
  }

  cp (args) {
    console.log('--cp--', args)
  }

  mv (args) {
    console.log('--mv--', args)
  }

  rm (args) {
    console.log('--rm--', args)
  }

  os ([cmd]) {
    m.logSystemInfo(cmd)
  }

  hash (args) {
    console.log('--hash--', args)
  }

  compress (args) {
    console.log('--compress--', args)
  }

  decompress (args) {
    console.log('--decompress--', args)
  }

  exit () {
    this._rl.close()
  }

  parseInput (line) {
    return h.parseRawInput(line)
  }

  validateInput (command, args) {
    const res = h.validate(command, args)
    return res === true
      ? { value: true, message: '' }
      : { value: false, message: res }
  }

  repl () {
    this._rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: h.PROMPT_MSG,
    })

    this._rl.on('line', async (line) => {
      const [command, args] = this.parseInput(line)
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
