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
import { Dogs } from "./Dogs";
export interface PersonsAttributes {
  id: number;
  name: string;
}

interface PersonsCreationAttributes extends Optional<PersonsAttributes, "id"> {}

export class Persons
  extends Model<PersonsAttributes, PersonsCreationAttributes>
  implements PersonsAttributes {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getDogs!: BelongsToManyGetAssociationsMixin<Dogs>;
  public addDog!: BelongsToManyAddAssociationMixin<Dogs, number>;
  public addDogs!: BelongsToManyAddAssociationsMixin<Dogs[], number>;
  public hasDog!: BelongsToManyHasAssociationMixin<Dogs, number>;
  public countDogs!: BelongsToManyCountAssociationsMixin;
  public removeDog!: BelongsToManyRemoveAssociationMixin<Dogs, number>;
  public removeDogs!: BelongsToManyRemoveAssociationsMixin<Dogs[], number>;
  public setDogs!: BelongsToManySetAssociationsMixin<Dogs[], number>;
  public createDog!: BelongsToManyCreateAssociationMixin<Dogs>;

  public readonly dogs?: Dogs[];

  public static associations: {
    dogs: Association<Dogs, Persons>;
  };
}

export function PersonsFactory(sequelize: Sequelize) {
  Persons.init(
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
      tableName: "persons",
      sequelize,
    }
  );
  return Persons;
}
