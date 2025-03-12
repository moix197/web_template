import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		accountName: {
			type: String,
			required: true,
		},
		logo: {
			type: [String], // Array of strings (for storing URLs or image paths)
			required: true,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true } // Optionally add timestamps for createdAt and updatedAt
);

// Ensure the unique constraint on the "name" field
paymentMethodSchema.index({ name: 1 }, { unique: true });

const PaymentMethodModel =
	mongoose.models.PaymentMethod ||
	mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethodModel;
