const transactions = {
	data: {
		name: "transactions",
		singularName: "Transaction",
		pluralName: "Transactions",
		hideFromNav: true,
	},
	itemsTable: {
		values: ["status", "status", "transactionId"],
		indexValueName: "",
	},
	forms: {
		new: [],
		update: {
			values: [
				{
					name: "status",
					label: "Select the status",
					type: "select",
					validation: "text",
					options: [
						{ value: "pending", name: "Pending" },
						{ value: "failed", name: "Failed" },
						{ value: "completed", name: "Completed" },
					],
				},
				{
					name: "transactionId",
					label: "transaction id",
					placeholder: "Enter your transaction id here",
					type: "text",
					validation: "textAllowEmptyString",
				},
				{
					name: "amount",
					label: "amount",
					placeholder: "Enter the transaction amount here",
					type: "number",
					validation: "price",
				},
				{
					name: "paymentMethod",
					label: "Payment Method",
					type: "select",
					validation: "text",
					options: "paymentMethods",
				},
			],
		},
	},
};

export default transactions;
