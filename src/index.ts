import App from "./app"
import { readdirSync } from "fs"

const PORT = 1337
const CONTROLLERS = readdirSync(__dirname + "/controllers").map((file: string) => {
	let controller = require(`./controllers/${file.split('.')[0]}`).default

	return new controller()
})

const APP = new App(CONTROLLERS, PORT)

APP.listen()
