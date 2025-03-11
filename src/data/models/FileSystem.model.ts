import mongoose from "mongoose";

const fileSystemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isDirectory: {
			type: Boolean,
			required: true,
		},
		path: {
			type: String,
			required: true,
		},
		parentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "FileSystem",
			default: null,
		},
		rootName: {
			type: String,
		},
		size: {
			type: Number,
			default: null, // For files only
		},
		mimeType: {
			type: String,
			default: null, // For files only
		},
	},
	{ timestamps: true }
);

fileSystemSchema.index({ rootName: 1 });

const FileSystemModel =
	mongoose.models.FileSystem || mongoose.model("FileSystem", fileSystemSchema);

export default FileSystemModel;
