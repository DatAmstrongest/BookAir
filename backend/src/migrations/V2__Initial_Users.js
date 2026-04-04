const argon2 = require("argon2");

/**
 * Seed users match `User` mongoose schema. Default password: password123
 *
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 */
module.exports = {
  async up(db) {
    const passwordHash = await argon2.hash("password123");
    await db.collection("users").insertMany([
      {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        birthDate: new Date("1990-01-15"),
        passwordHash,
        createdAt: new Date(),
      },
      {
        name: "Alice",
        surname: "Smith",
        email: "alice.smith@example.com",
        birthDate: new Date("1992-06-20"),
        passwordHash,
        createdAt: new Date(),
      },
    ]);
  },

  async down(db) {
    await db.collection("users").deleteMany({
      email: { $in: ["john.doe@example.com", "alice.smith@example.com"] },
    });
  },
};
