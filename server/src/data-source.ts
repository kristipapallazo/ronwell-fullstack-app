import { DataSource } from "typeorm";
import { Product } from "./entity/Product";
// import config from "config";
import config from "config";
import { DbConfig } from "./types";

const dbConfig: DbConfig = config.get("Db");
console.log("dbConfig :>> ", dbConfig);

if (
  !dbConfig ||
  !dbConfig.host ||
  !dbConfig.port ||
  !dbConfig.username ||
  !dbConfig.database ||
  !dbConfig.password
) {
  console.log(
    "dbConfig not found or not configured properly! Check default.json file."
  );
  process.exit(1);
}

export const AppDataSource = new DataSource({
  ...dbConfig,
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    // check for any error during initialization
    console.error(
      `Error during Data Source initialization: dbConfig => ${dbConfig}`,
      err
    );
  });
