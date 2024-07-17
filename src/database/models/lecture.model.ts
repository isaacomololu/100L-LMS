import { Column, Model, Table, DataType, ForeignKey, BelongsTo, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Course } from './course.model';

@Table
export class Lecture extends Model<Lecture> {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    courseId: string;

    @BelongsTo(() => Course)
    course: Course;
}