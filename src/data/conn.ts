import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/db.sqlite'
});

export const SECRET_TOKEN = "kawabounga"

sequelize.sync()