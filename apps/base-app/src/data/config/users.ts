const users = {
	data: {
		name: "users",
		singularName: "user",
		pluralName: "users",
	},
	itemsTable: {
		values: ["email", "role"],
		indexValueName: "",
	},
	forms: {
		defaultValues: {
			isActive: false,
		},
		new: [],
		update: {
			values: [
				{
					name: "name",
					label: "User Name",
					placeholder: "Enter the user name here",
					type: "text",
					validation: "text",
				},
				{
					name: "role",
					label: "User Role",
					placeholder: "Enter the user role here",
					type: "select",
					validation: "text",
					options: [
						{ value: "banned", name: "banned" },
						{ value: "viewer", name: "viewer" },
					],
				},
			],
		},
	},
};

export default users;
