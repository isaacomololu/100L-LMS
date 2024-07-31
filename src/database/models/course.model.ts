import { Column, Model, Table, DataType, BelongsToMany, ForeignKey, PrimaryKey, IsUUID, HasMany, BelongsTo, Index } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { User, Lecture, Enrollment, CourseLecturer } from './';

@Table
export class Course extends Model<Course> {
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
  name: string;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  unit: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  // @ForeignKey(() => Course)
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // courseId: string;

  // @BelongsTo(() => Course)
  // course: Course;

  @BelongsToMany(() => User, () => Enrollment)
  enrroledStudents: User[];

  @HasMany(() => CourseLecturer, {
    sourceKey: 'code',
    foreignKey: 'courseCode'
  })
  courseLecturers: CourseLecturer[];

  @BelongsToMany(() => User, {
    through: () => CourseLecturer,
    otherKey: 'lecturerId',
    foreignKey: 'courseCode',
    as: 'lecturers'
  })
  lecturers?: User[];

  // @BelongsToMany(() => User, () => CourseLecturer)
  // lecturers: User[];

  @HasMany(() => Lecture)
  lectures: Lecture[];

  async getCourse() {
    return await Course;
  }
}