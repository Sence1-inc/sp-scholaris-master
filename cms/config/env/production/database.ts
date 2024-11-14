export default ({ env }) => ({
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: "mysql",
          host: env('INSTANCE_CONNECTION_NAME', 'localhost'),
          port: env('DATABASE_PORT', 3306),
          database: env('DATABASE_NAME', 'default'),
          username: env('DATABASE_USER', 'root'),
          password: env('DATABASE_PASSWORD', ''),
        },
        options: {
          useNullAsDefault: true,
        },
      },
    },
  });