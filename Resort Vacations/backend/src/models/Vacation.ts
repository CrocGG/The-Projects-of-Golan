import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript"
import User from "./User"
import Liker from "./Liker"

@Table({
    underscored: true
})
export default class Vacation extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)
    destination: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.DATE)
    beginningDate: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    endingDate: Date

    @AllowNull(false)
    @Column(DataType.INTEGER)
    price: number

    @AllowNull(false)
    @Column(DataType.STRING)
    imageUrl: string

    @BelongsToMany(() => User, () => Liker, 'vacationId')
    likers: User[]
}
