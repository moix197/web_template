const paymentsData = {
  name: "paymentsData",
  required: ["paackage_id", "totalAmount", "status"],
  properties: {
    package_id: { bsonType: "objectId" },
    totalAmount: { bsonType: ["double", "int"] },
    status: { bsonType: "string", enum: ["pending", "paid", "unpaid"] },
    parts: { bsonType: "int" },
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
          platform: { bsonType: ["string"] },
        },
      },
    },
  },
  index: false,
  unique: true,
};

export { paymentsData };
