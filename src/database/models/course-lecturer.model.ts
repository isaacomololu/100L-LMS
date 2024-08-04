import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Student, Course } from './';

@Table //Register Lecturers
export class CourseLecturer extends Model<CourseLecturer> {
    @ForeignKey(() => Student)
    @Column
    lecturerId: string;

    @ForeignKey(() => Course)
    @Column
    courseCode: string;

    @BelongsTo(() => Student)
    lecturer: Student;

    @BelongsTo(() => Course, {
        targetKey: 'code',
        foreignKey: 'courseCode'
    })
    course: Course;

    @Column({ defaultValue: new Date() })
    assignedAt: Date;
}