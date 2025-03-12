import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true, // Ensures email is unique
			match: [/.+@.+\..+/, "Please enter a valid email address"], // Email format validation
		},
		image: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["owner", "admin", "editor", "viewer", "banned"], // Roles you might need
			required: true,
			default: "viewer",
		},
	},
	{ timestamps: true }
);

// Ensure unique constraint for packages by name
//userSchema.index({ name: 1 }, { unique: true });

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
