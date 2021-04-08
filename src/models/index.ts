import { Sequelize } from "sequelize";
import { DogsFactory, Dogs as DogsClass } from "./Dogs";
import { PersonsFactory, Persons as PersonsClass } from "./Persons";

import dotenv from "dotenv";
dotenv.config();

export interface DB {
  sequelize: Sequelize;
  Dogs: typeof DogsClass;
  Persons: typeof PersonsClass;
}

const { DB_NAME, DB_PORT, DB_PASSWORD, DB_URL, DB_USER } = process.env;

export const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`
);

const Dogs = DogsFactory(sequelize);
const Persons = PersonsFactory(sequelize);

Persons.belongsToMany(Dogs, { through: "personsxdogs" });
Dogs.belongsToMany(Persons, { through: "personsxdogs" });

const db: DB = {
  sequelize,
  Persons,
  Dogs,
};

export default db;
