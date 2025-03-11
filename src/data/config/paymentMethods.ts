const paymentMethods = {
	data: {
		name: "paymentMethods",
		singularName: "Payment Method",
		pluralName: "Payment Methods",
	},
	itemsTable: {
		values: ["name", "isActive"],
		indexValueName: "",
	},
	forms: {
		defaultValues: {
			isActive: false,
		},
		new: [
			{
				name: "name",
				label: "Payment method name",
				placeholder: "Enter the payment method name here",
				type: "text",
				validation: "name",
			},
			{
				name: "accountName",
				label: "Payment method account name",
				placeholder: "Enter the payment method account name here",
				type: "text",
				validation: "textAllowEmptyString",
			},
			{
				name: "logo",
				label: "Add the logo for the payment method here",
				type: "image",
				imageCategory: "paymentMethods",
				validation: "relativeURL",
			},
			/*{
				name: "status",
				label: "Status",
				type: "toggle",
				defaultValue: "inactive",
				options: [
					{ value: "active", name: "active" },
					{ value: "inactive", name: "inactive" },
				],
			},*/
		],
		update: {
			hasSepareteActivationToggle: true,

			values: [
				{
					name: "name",
					label: "Payment method name",
					placeholder: "Enter the payment method name here",
					type: "text",
					validation: "name",
				},
				{
					name: "accountName",
					label: "Payment method account name",
					placeholder: "Enter the payment method account name here",
					type: "text",
					validation: "textAllowEmptyString",
				},
				{
					name: "logo",
					label: "Add the logo for the payment method here",
					type: "image",
					imageCategory: "paymentMethods",
					validation: "relativeURL",
				},
			],
		},
	},
};

export default paymentMethods;
