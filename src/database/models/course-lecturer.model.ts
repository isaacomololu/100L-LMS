import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User, Course } from './';

@Table //Register Lecturers
export class CourseLecturer extends Model<CourseLecturer> {
    @ForeignKey(() => User)
    @Column
    lecturerId: string;

    @ForeignKey(() => Course)
    @Column
    courseCode: string;

    @BelongsTo(() => User)
    lecturer: User;

    @BelongsTo(() => Course, {
        targetKey: 'code',
        foreignKey: 'courseCode'
    })
    course: Course;

    @Column({ defaultValue: new Date() })
    assignedAt: Date;
}