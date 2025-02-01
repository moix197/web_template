const usersData = {
	name: "usersData",
	required: ["name", "email", "role"],
	properties: {
		name: { bsonType: "string" },
		email: { bsonType: "string" },
		role: {
			bsonType: "array",
			items: {
				type: "string",
				enum: ["admin", "owner", "editor", "user", "visitor"],
			},
			minItems: 1,
			uniqueItems: false,
		},
	},
	index: { address: 1 },
	unique: true,
};

export { usersData };
