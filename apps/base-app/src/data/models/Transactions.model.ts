import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: ["pending", "completed", "failed"],
		required: true,
		default: "pending",
	},
	transactionId: {
		type: String,
		required: true,
		defautlt: "",
	},
	amount: {
		type: mongoose.Schema.Types.Number,
		required: true,
		default: 0,
	},
	paymentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Payment",
		required: true,
	},
	paymentMethod: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PaymentMethod",
		default: null,
	},
});

const TransactionsModel =
	mongoose.models.Transactions ||
	mongoose.model("Transactions", transactionSchema);

export default TransactionsModel;
