import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: mongoose.Schema.Types.Number,
			required: true,
		},
		discount: {
			type: mongoose.Schema.Types.Number,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		paymentMethods: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "PaymentMethod", // Assuming PaymentMethod is another model
			},
		],
		features: [
			{
				description: {
					type: String,
					required: true,
				},
				status: {
					type: String,
					enum: ["highlight", "regular", "deEmphasize"],
					required: true,
				},
				isActive: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true }
);

// Ensure unique constraint for packages by name
//packageSchema.index({ name: 1 }, { unique: true });

const PackageModel =
	mongoose.models.Package || mongoose.model("Package", packageSchema);

export default PackageModel;
