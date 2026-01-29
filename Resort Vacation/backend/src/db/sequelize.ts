import { Sequelize } from "sequelize-typescript";
import config from 'config'
import User from "../models/User";
import Vacation from "../models/Vacation";
import Role from "../models/Role";
import Liker from "../models/Liker";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [User, Vacation, Role, Liker],
    logging: console.log
})

export default sequelize

