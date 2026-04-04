module.exports = {
  mongodb: {
    url: process.env.DB_URI,
    databaseName: "bookingDB",
  },
  migrationsDir: "src/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  moduleSystem: "commonjs",
};
