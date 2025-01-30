import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );

  const databaseMaxConnetionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnetionsResult = await database.query(
    "select count(*)::int from pg_stat_activity where datname = 'local_db'",
  );

  const databaseOpenedConnectionsValue =
    databaseOpenedConnetionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnetionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
