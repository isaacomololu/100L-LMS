import { Table, Column, Model, IsUUID, BelongsTo, PrimaryKey, ForeignKey, DataType, HasMany } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Student, Course, Question } from '.';

@Table
export class Assignment extends Model<Assignment> {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    public title: string;

    @Column({ type: DataTypes.TEXT })
    public description: string;

    @Column({ type: DataTypes.INTEGER, allowNull: false })
    totalMarks: string;

    @Column({ type: DataTypes.DATE, allowNull: false })
    dueDate: Date;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code: string;

    @BelongsTo(() => Course)
    course: Course;

    @HasMany(() => Question)
    questions: Question[];
}