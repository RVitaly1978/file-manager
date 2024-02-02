import { App } from './app.js'
import { getHomedir } from './modules/index.js'
import { getSessionUsername } from './helpers/index.js'

const sessionUsername = getSessionUsername()
const homedir = getHomedir()

const app = new App(sessionUsername, homedir)
app.start()
