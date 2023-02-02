import { Sequelize, DataTypes, CreationOptional, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../data/conn';



export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    declare id: CreationOptional<number>;
    declare image: string;
    declare description: string;
    declare link: string
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

Project.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: new DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: new DataTypes.STRING(255),
            allowNull: false
        },
        link: {
            type: new DataTypes.STRING(255),
            allowNull: true,
            defaultValue: ""
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'projects',
        sequelize // passing the `sequelize` instance is required
    }
);

