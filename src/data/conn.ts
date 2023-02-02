import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/data/db.sqlite'
});

export const SECRET_TOKEN = "kawabounga"
export const BASE_SERVER = "http://127.0.0.1:3000"

sequelize.sync()