/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 */
module.exports = {
  async up(db) {
    await db.collection("bookings").insertMany([
      {
        title: "Strategy Workshop 2026",
        description: "Annual planning session for the executive team.",
        category: "Corporate",
        startDate: new Date("2026-05-10T09:00:00Z"),
        endDate: new Date("2026-05-10T17:00:00Z"),
        status: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Product Launch Event",
        description: "Public unveiling of the new Gemini integration features.",
        category: "Marketing",
        startDate: new Date("2026-06-15T18:00:00Z"),
        endDate: new Date("2026-06-15T21:00:00Z"),
        status: 1,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        title: "Maintenance Window",
        description: "Server migration and database optimization.",
        category: "IT",
        startDate: new Date("2026-04-20T00:00:00Z"),
        endDate: new Date("2026-04-20T04:00:00Z"),
        status: 2,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  },

  async down(db) {
    await db.collection("bookings").deleteMany({
      title: {
        $in: [
          "Strategy Workshop 2026",
          "Product Launch Event",
          "Maintenance Window",
        ],
      },
    });
  },
};
