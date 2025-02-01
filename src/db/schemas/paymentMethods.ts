const paymentMethodsData = {
  name: "paymentMethodsData",
  required: ["name", "logo", "status"],
  properties: {
    name: { bsonType: "string" },
    logo: { bsonType: ["string"] },
    status: {
      bsonType: "string",
      enum: ["active", "inactive", "hold", "revision"],
    },
  },
  index: false,
  unique: true,
};

export { paymentMethodsData };
