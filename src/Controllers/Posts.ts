import { PostModel as Post, PostInterface } from "../Utils/Post"
import { Router, Request, Response } from "express"

export const ROUTES = [
	{
		path: "/",
		method: "post",
		function: "CreatePost",
	},
	{
		path: "/:id",
		method: "get",
		function: "GetPost",
	},
	{
		path: "/:id",
		method: "post",
		function: "UpdatePost",
	},
]

export default class PostController {
	[x: string]: any

	public router = Router()
	public basePath = "/posts"
	
	private posts: PostInterface[] = []

	constructor() {
		this.intializeRoutes()
	}

	public intializeRoutes() {
		ROUTES.map((route) => {
			let path = `${this.basePath}${route.path ?? ''}`

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

	async GetPost(request: Request, response: Response) {
		let postId: string = request.params.id
	
		let post = await Post.findOne({
			_id: postId,
		})
	
		response.send({
			post,
		})
	}
	
	async CreatePost(request: Request, response: Response) {
		let post: PostInterface = new Post(request.body)
	
		post = await post.save()
	
		response.send(post)
	}
	
	async UpdatePost(request: Request, response: Response) {
		let body: PostInterface = request.body
	
		await Post.updateOne({
			_id: request.params.id
		}, body).exec()
	
		response.send({
			status: true
		})
	}
}