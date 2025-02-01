const bookData = {
	name: "bookData",
	required: ["name", "ownerId", "paymentId"],
	ownerId: { bsonType: "objectId" },
	paymentId: { bsonType: "objectId" },
	authorities: {
		bsonType: "array",
		items: { type: "objectId" },
		uniqueItems: true,
	},
	properties: {
		name: { bsonType: "string" },
		isActive: { bsonType: "boolean" },
		pages: {
			bsonType: "object",
			properties: {
				isBookCover: { bsonType: "boolean" },
				bookCoverInner: { bsonType: "boolean" },
				content: { bsonType: "string" },
			},
		},
	},
	index: false,
	unique: true,
};

export { bookData };
