import {
  Association,
  DataTypes,
  Model,
  Optional,
  Sequelize,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
} from "sequelize";
import { Persons } from "./Persons";
export interface DogsAttributes {
  id: number;
  name: string;
}

interface DogsCreationAttributes extends Optional<DogsAttributes, "id"> {}

export class Dogs extends Model<DogsAttributes, DogsCreationAttributes> implements DogsAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPersons!: BelongsToManyGetAssociationsMixin<Persons>;
  public addPerson!: BelongsToManyAddAssociationMixin<Persons, number>;
  public addPersons!: BelongsToManyAddAssociationsMixin<Persons[], number>;
  public hasPerson!: BelongsToManyHasAssociationMixin<Persons, number>;
  public countPersons!: BelongsToManyCountAssociationsMixin;
  public removePerson!: BelongsToManyRemoveAssociationMixin<Persons, number>;
  public removePersons!: BelongsToManyRemoveAssociationsMixin<Persons[], number>;
  public setPersons!: BelongsToManySetAssociationsMixin<Persons[], number>;
  public createPerson!: BelongsToManyCreateAssociationMixin<Persons>;

  public readonly persons?: Persons[];

  public static associations: {
    persons: Association<Persons, Dogs>;
  };
}

export function DogsFactory(sequelize: Sequelize) {
  Dogs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "dogs",
      sequelize,
    }
  );
  return Dogs;
}
