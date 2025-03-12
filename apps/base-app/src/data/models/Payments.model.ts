import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
	{
		package_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Package", // Assuming this references a 'Package' model
			default: null,
		},
		parent_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book", // Assuming this references a 'Book' model
			required: true,
			unique: true,
		},
		totalAmount: {
			type: Number,
			default: 0,
		},
		parts: {
			type: Number,
			default: 1,
		},
		status: {
			type: String,
			enum: ["pending", "paid", "unpaid"],
			required: true,
			default: "unpaid",
		},
		discount: {
			type: Number,
			default: 0,
		},
		notes: {
			type: String,
			default: "",
		},
		transactions: [
			{
				type: mongoose.Schema.Types.ObjectId, // Reference to Transaction schema
				ref: "Transaction", // Referring to the 'Transaction' model
			},
		],
		default: [],
	},
	{ timestamps: true }
);

const PaymentModel =
	mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default PaymentModel;
