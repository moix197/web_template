const booksData = {
  name: "booksData",
  required: ["name", "isActive", "ownerId", "paymentId", "pages"],
  properties: {
    name: { bsonType: "string" },
    isActive: { bsonType: "bool" }, // Use 'bool' instead of 'boolean'
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
        required: ["isBookCover", "bookCoverInner", "content"],
        properties: {
          isBookCover: { bsonType: "bool" }, // Use 'bool' instead of 'boolean'
          bookCoverInner: { bsonType: "bool" }, // Use 'bool' instead of 'boolean'
          content: { bsonType: "string" },
        },
      },
    },
  },
  index: false,
  unique: true,
};

export { booksData };
