import { hashSync, compareSync } from "bcryptjs"
import { Schema, Document, model, HookSyncCallback, Aggregate } from "mongoose"
import { ObjectID, ObjectId } from "mongodb"


export interface PostInterface extends Document {
	userId: ObjectId;
	image:String;
	location: Object;
}

const PostSchema: Schema = new Schema({
	userId: { type: ObjectId},
	image: { type: String },
	location: { type: Object }
})

PostSchema.pre("save", function(this: PostInterface, next) {
	if (this.isNew) {
	}

	next()
})

// Export the model and return your PostInterface interface
export const PostModel =  model<PostInterface>("Post", PostSchema)