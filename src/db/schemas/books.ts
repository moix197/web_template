const books = {
	name: "books",
	required: ["name", "isActive"],
	properties: {
		name: { bsonType: "string" },
		isActive: { bsonType: "bool" },
		ownerId: { bsonType: "objectId" },
		paymentId: { bsonType: "objectId" },
		authorities: {
			bsonType: "array",
			items: { bsonType: "objectId" }, // Corrected from 'type' to 'bsonType'
			uniqueItems: true,
		},
		pages: {
			bsonType: "array",
			items: {
				bsonType: "object", // Corrected from 'type' to 'bsonType'
				required: ["content"],
				properties: {
					isBookCover: { bsonType: "bool" },
					bookCoverInner: { bsonType: "bool" },
					content: { bsonType: "string" },
				},
			},
		},
	},
	index: ["paymentId"],
	unique: true,
};

export { books };
