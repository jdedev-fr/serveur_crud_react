import { Sequelize, DataTypes, CreationOptional, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../data/conn';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare email: string;
    declare password: string;
    declare level: number
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        level: {
            type: new DataTypes.DECIMAL(10.2),
            allowNull: true,
            defaultValue: 0
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        sequelize // passing the `sequelize` instance is required
    }
);

User.addHook('afterValidate', (user, options) => {
    const p = bcrypt.hashSync("" + user.get().password, saltRounds)
    user.set("password", p)

});