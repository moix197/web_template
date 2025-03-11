import mongoose from "mongoose";

// Define the schema directly inside the bookSchema
const bookSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		paymentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Payment",
		},
		editors: {
			type: [String],
		},
		default: [],
		pages: [
			{
				title: {
					type: String,
					required: true,
				},
				type: {
					type: String,
					enum: ["frontCover", "backCover", "page"],
					required: true,
				},
				content: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

// Adding index for paymentId (as per your original MongoDB schema)
bookSchema.index({ paymentId: 1 });

const BookModel = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default BookModel;
