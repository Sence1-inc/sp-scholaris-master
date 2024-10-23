module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_FILENAME", "./data/data.db"),
    },
    useNullAsDefault: true,
  },
});
