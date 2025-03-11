const packages = {
	name: "packages",
	required: ["name", "price", "isActive"],
	properties: {
		name: { bsonType: "string" },
		price: { bsonType: ["double", "int"] },
		discount: { bsonType: ["double", "int"] },
		isActive: { bsonType: "bool" },
		paymentMethods: {
			bsonType: "array",
			items: {
				bsonType: "objectId",
			},
			//minItems: 1,
			uniqueItems: false,
		},
		features: {
			bsonType: "array",
			items: {
				bsonType: "object",
				properties: {
					description: {
						bsonType: "string",
					},
					status: {
						bsonType: "string",
						enum: ["highlight", "deEmphasize", "active", "inactive"],
					},
				},
			},
		},
	},
	index: false,
	unique: true,
};

export { packages };
