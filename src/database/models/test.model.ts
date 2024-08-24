import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Course, Question } from './';

@Table({ tableName: 'test', paranoid: true, timestamps: true })
export class Test extends Model {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;

    @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
    public title: string;

    @Column({ type: DataTypes.TEXT })
    public description: string;

    @Column({ type: DataTypes.DATE })
    public startTime: Date;

    @Column({ type: DataTypes.DATE })
    public endTime: Date;

    @Column({ type: DataTypes.INTEGER, allowNull: false })
    public duration: number; // in minutes

    @Column({ type: DataTypes.INTEGER, allowNull: false })
    totalMarks: number;

    @ForeignKey(() => Course)
    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    code: string;

    @BelongsTo(() => Course)
    course: Course;

    @HasMany(() => Question)
    questions: Question[];
}