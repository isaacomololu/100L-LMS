import { Column, PrimaryKey, IsUUID, Model, BelongsTo, Table, HasMany, Index, ForeignKey } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { Course } from './';

@Table
export class Lecturer extends Model {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;

    @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
    public email: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    public firstName: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    public otherName: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    public phone: string;

    @Column({
        type: DataTypes.ENUM,
        values: ['lecturer', 'admin'],
        defaultValue: 'lecturer',
    })
    public type: 'lecturer' | 'admin';

    @Column({
        type: DataTypes.STRING,
        set(value: string) {
            const salt = bcrypt.genSaltSync();
            this.setDataValue('password', bcrypt.hashSync(value, salt));
        },
        allowNull: false,
    })
    public password: string;

    @Column({ type: DataTypes.STRING })
    public avatar: string;

    @ForeignKey(() => Course)
    @Column
    public code: string;

    @BelongsTo(() => Course)
    public assignedCourse: Course;

    validatePassword(val: string) {
        return bcrypt.compareSync(val, this.getDataValue('password'));
    }
}