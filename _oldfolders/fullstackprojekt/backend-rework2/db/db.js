import sqlite3 from "sqlite3";
import { createTables } from "./create_tables.js";

export function errorHandling(err) {
    if (err) {
      console.log(err);
    }
  }

export const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
      errorHandling(err);
    } else {
      db.run("PRAGMA foreign_keys = ON", errorHandling);
      console.log("Connected to the database.");
      createTables()
    }
  });