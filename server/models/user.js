import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: { type: String, requried: true },
	email: { type: String, requried: true },
	password: {type: String, requried: true },
	todo: {type: Array},
	doing: {type: Array},
	done: {type: Array}
})

export default mongoose.model("User", userSchema);