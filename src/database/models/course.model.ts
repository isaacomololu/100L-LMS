import { Column, Model, Table, DataType, BelongsToMany, ForeignKey, PrimaryKey, IsUUID, HasMany, BelongsTo, Index } from 'sequelize-typescript';
import { Lecturer, Lecture, Student } from './';

@Table
export class Course extends Model<Course> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  public code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public unit: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public description: string;

  // @BelongsToMany(() => Student, () => Enrollment)
  // enroledStudents: Student[];
  @BelongsToMany(() => Student, {
    through: 'Enrollment',
    foreignKey: 'courseCode',
    otherKey: 'matricNo'
  })
  public enrolledStudents: Student[];

  @HasMany(() => Lecturer, {
  })
  public lecturers: Lecturer[];

  @HasMany(() => Lecture)
  public lectures: Lecture[];

  async getCourse() {
    return await Course;
  }
}