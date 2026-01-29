import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Index, Model, PrimaryKey, Table } from "sequelize-typescript"
import Role from "./Role"
import Liker from "./Liker"
import Vacation from "./Vacation"

@Table({
    underscored: true
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName: string

    @AllowNull(false)
    @Column(DataType.STRING)
    lastName: string

    @AllowNull(false)
    @Index({ unique: true })
    @Column(DataType.STRING)
    email: string

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string

    @ForeignKey(() => Role)
    @AllowNull(false)
    @Default('717d2b5b-ee87-ed4b-8629-ebcd13838628')
    @Column(DataType.UUID)
    roleId: string

    @BelongsTo(() => Role)
    role: Role

    @BelongsToMany(() => Vacation, () => Liker, 'userId')
    likedVacations: Vacation[]
}
