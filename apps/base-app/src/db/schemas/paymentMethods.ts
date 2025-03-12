const paymentMethods = {
	name: "paymentMethods",
	required: ["name", "accountName", "logo", "isActive"],
	properties: {
		name: { bsonType: "string" },
		accountName: { bsonType: "string" },
		logo: { bsonType: ["string"] },
		isActive: { bsonType: "bool" },
	},
	index: false,
	unique: true,
};

export { paymentMethods };
