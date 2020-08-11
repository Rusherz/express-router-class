import * as express from "express"
import * as mongoose from "mongoose"
import * as bodyParser from "body-parser"

mongoose.connect("mongodb://localhost:27017/socketpro", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
})

class App {
	public port: number
	public app: express.Application

	private controllers: any

	constructor(controllers: any, port: number) {
		this.port = port
		this.controllers = controllers
		this.app = express()

		this.initializeMiddlewares()
		this.initializeControllers()
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json())
	}

	private initializeControllers() {
		this.controllers.forEach((controller: any) => {
			this.app.use(`/v1${controller.basePath}`, controller.router)
		})
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`)
		})
	}
}

export default App
