import { Column, Model, Table, DataType, BelongsToMany, HasOne, PrimaryKey, IsUUID, HasMany } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { User, StudentCourses, Lecture, Enrollment } from './';

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

  // @BelongsToMany(() => User, () => StudentCourses)
  // students: User[];


  // @HasMany(() => CourseEnrollment)
  // enrollments: CourseEnrollment[];

  @HasOne(() => Lecture)
  lecture: Lecture;

  @BelongsToMany(() => User, () => Enrollment)
  users: User[];

  async getCourse() {
    return await Course;
  }
}


