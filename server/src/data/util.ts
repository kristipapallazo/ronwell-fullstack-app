import fs from "node:fs/promises";
import path from "node:path";
import { UsersData } from "../types";

export async function readData() {
  console.log("__filename, __dirname :>> ", __filename, __dirname);
  try {
    const data = await fs.readFile(
      path.join(__dirname, "users-db.json"),
      "utf-8"
    );
    console.log("data :>> ", data);
    return JSON.parse(data);
  } catch (error) {
    console.log("error :>> ", error);
  }
}

export async function writeData(data: UsersData) {
  await fs.writeFile(
    path.join(__dirname, "users-db.json"),
    JSON.stringify(data)
  );
}
