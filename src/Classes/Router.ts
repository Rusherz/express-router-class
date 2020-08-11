
import { Router as ExpressRouter } from "express"

export interface Route {
	path: string;
	method: string;
	function: string;
}

export default class Router {
	[x: string]: any

	public router = ExpressRouter()
	public basePath = "/posts"

	public routes: Route[] = []
	
	constructor() {
		this.intializeRoutes()
	}

	public intializeRoutes() {
		this.routes.map((route) => {
			let path = `${this.basePath}${route.path}`
console.log(this[route.function])
			switch (route.method) {
				case "get":
					this.router.get(
						path,
						this[route.function]
					)
					break
				case "post":
					this.router.get(
						path,
						this[route.function]
					)
					break
			}
		})
	}
}