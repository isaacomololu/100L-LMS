import { Column, Model, Table, DataType, ForeignKey, BelongsToMany, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { User, Course } from './';

@Table //many to many link
export class StudentCourses extends Model<StudentCourses> {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    studentId: number;

    @PrimaryKey
    @ForeignKey(() => Course)
    @Column
    courseId: number;
}