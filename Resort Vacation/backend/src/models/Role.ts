import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";

@Table({
    underscored: true
})
export default class Role extends Model {
    @PrimaryKey
    @Default(DataType.ENUM('717d2b5b-ee87-ed4b-8629-ebcd13838628','6d8e8e2c-2e5a-e620-6d8e-cf59793fb15e'))
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.ENUM('normal','manager'))
    roleName: string

    @HasMany(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    users: User[]
}

