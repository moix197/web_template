const packagesData = {
	data: {
		name: "packagesData",
		singularName: "package",
		pluralName: "packages",
	},
	itemsTable: {
		values: ["name", "price", "isActive"],
		indexValueName: "",
	},
	forms: {
		defaultValues: {
			isActive: false,
			discount: 0,
			paymentMethods: [],
			features: [],
		},
		new: [
			{
				name: "name",
				label: "Package name",
				placeholder: "Enter the package name here",
				type: "text",
				validation: "name",
			},
			{
				name: "price",
				label: "Package price",
				placeholder: "Enter the package price here",
				type: "number",
				validation: "price",
			},
			/*{
				name: "discount",
				label: "Discount percentage",
				placeholder: "Enter your discount percentage here",
				type: "number",
				validation: "price",
			},*/
			/*{
				name: "features",
				label: "Package features",
				placeholder: "Enter a single feature here",
				type: "multiValue",
				defaultValue: "",
				validation: "text",
			},*/
		],
		update: {
			hasSepareteActivationToggle: true,
			activationLists: ["paymentMethods"],
			values: [
				{
					name: "name",
					label: "Package name",
					placeholder: "Enter the package name here",
					type: "text",
					validation: "name",
				},
				{
					name: "price",
					label: "Package price",
					placeholder: "Enter the package price here",
					type: "text",
					validation: "price",
				},
				{
					name: "discount",
					label: "Discount percentage",
					placeholder: "Enter your discount percentage here",
					type: "number",
					validation: "price",
				},
				/*{
					name: "paymentMethods",
					label: "Payment Method",
					Placeholder: "Select your payment method",
					type: "multiValue",
					validation: "paymentMethods",
					getOptions: "paymentMethods",
					options: "paymentMethods" [
						{ _id: 0, name: "" },
						{ _id: 1, name: "paypal" },
						{ _id: 22, name: "skrill" },
					]
				},*/

				/*{
					name: "features",
					label: "Package features",
					placeholder: "Enter a single feature here",
					type: "multiValue",
					validation: "paymentMethods",
				},*/
			],
			arrayList: [
				{
					name: "features",
					sectionTitle: "Features",
					sectionTitleSingular: "Feature",
					hasSepareteActivationToggle: true,
					useDrawerToUpdate: true,
					itemsTable: {
						values: ["description", "status", "isActive"],
					},
					/*newItem: {
						isActive: false,
						description: "My description",
						status: "Regular",
					},*/
					values: [
						{
							name: "description",
							label: "Description",
							placeholder: "Add a description here",
							type: "text",
							validation: "name",
						},
						{
							name: "status",
							label: "Select a status",
							type: "select",
							validation: "text",
							options: [
								{ value: "highlight", name: "Highlight" },
								{ value: "regular", name: "Regular" },
								{ value: "deEmphasize", name: "De emphasize" },
							],
						},
					],
				},
			],
		},
	},
};

export default packagesData;
