const payments = {
	data: {
		name: "payments",
		singularName: "Payment",
		pluralName: "Payments",
		hideFromNav: true,
	},
	itemsTable: {
		values: ["name", "totalAmount"],
		indexValueName: "",
	},
	forms: {
		new: [],
		update: {
			related: [
				{
					name: "transactions",
					relatedValue: "paymentId",
					passedValue: "_id",
					showAsArrayList: true,
					useDrawerToUpdate: true,
					itemsTable: {
						values: ["transactionId", "amount", "status"],
					},
					/*newItem: {
						amount: "0",
						paymentMethod: null,
						status: "pending",
						transactionId: "0f",
					},*/
				},
			],

			/*arrayList: [
				{
					name: "transactions",
					sectionTitle: "Transactions",
					itemsTable: {
						values: ["transactionId", "amount", "paymentMethod"],
						indexValueName: "transaction",
					},
					newItem: {
						title: "My Title",
						type: "page",
						content: "New Page content",
					},
				},
			],*/

			values: [
				{
					name: "totalAmount",
					label: "total Amount",
					placeholder: "Enter the final Amount",
					type: "text",
					validation: "price",
				},
				{
					name: "parts",
					label: "Divide the payment in parts",
					placeholder: "Enter the number of parts here",
					type: "number",
					validation: "number",
				},
				{
					name: "status",
					label: "Select the status",
					type: "select",
					validation: "text",
					options: [
						{ value: "pending", name: "Pending" },
						{ value: "paid", name: "Paid" },
						{ value: "unpaid", name: "Unpaid" },
					],
				},
				{
					name: "discount",
					label: "Discount",
					placeholder: "Enter your discount percentage here",
					type: "number",
					validation: "price",
				},
				{
					name: "notes",
					label: "Payment notes",
					placeholder: "Enter your payment notes here",
					type: "textarea",
					validation: "textAllowEmptyString",
				},
			],
		},
	},
};

export default payments;
