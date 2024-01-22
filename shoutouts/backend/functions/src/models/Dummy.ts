import { Schema, model } from "mongoose"

const dummySchema = new Schema({
	name: { type: String, required: true },
	number: { type: Number, required: true }
})

dummySchema.set("toJSON", {
	transform: (doc, ret) => {
		ret.id = ret._id.toHexString()
		delete ret._id
		delete ret.__v
	}
})
const Dummy = model("Dummy", dummySchema)
export default Dummy
