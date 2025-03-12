const payments = {
	name: "payments",
	required: ["paackage_id", "totalAmount", "status"],
	properties: {
		package_id: { bsonType: "objectId" },
		totalAmount: { bsonType: ["double", "int"] },
		parts: { bsonType: "int" },
		status: { bsonType: "string", enum: ["pending", "paid", "unpaid"] },
		discount: { bsonType: ["double", "int"] },
		notes: { bsonType: "string" },
		transactions: {
			bsonType: "array",
			items: {
				type: "object",
				properties: {
					status: {
						bsonType: "string",
						enum: ["pending", "completed", "failed"],
					},
					transactionId: { bsonType: "string" },
					amount: { bsonType: ["double", "int"] },
					paymentMethod: { bsonType: "string" },
				},
			},
		},
	},
	index: false,
	unique: true,
};

export { payments };
