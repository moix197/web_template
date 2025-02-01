const usersData = {
  name: "usersData",
  required: ["name", "email", "role"],
  properties: {
    name: { bsonType: "string" },
    email: { bsonType: "string" },
    role: {
      bsonType: "array",
      items: {
        bsonType: "string",
        enum: ["admin", "owner", "editor", "user", "visitor"],
      },
      minItems: 1,
      uniqueItems: false,
    },
  },
  index: { name: 1 },
  unique: true,
};

export { usersData };
