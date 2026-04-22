import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface CategoryAttributes {
  id: number;
  name: string;
  color: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public color!: string;

  static initModel(sequelize: Sequelize): typeof Category {
    Category.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        color: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#3498db' },
      },
      { sequelize, tableName: 'categories' }
    );
    return Category;
  }
}

export default Category;
