import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Student, Course } from '.';

export enum EnrollmentStatus {
  ACTIVE = 'active',
  DROPPED = 'dropped',
  COMPLETED = 'completed',
  NOT_ENROLLED = 'not_enrolled'
}

@Table //Enrroll students
export class Enrollment extends Model<Enrollment> {
  @ForeignKey(() => Student)
  @Column
  public matricNo: string;

  @ForeignKey(() => Course)
  @Column
  public code: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(EnrollmentStatus)),
    allowNull: false,
    defaultValue: EnrollmentStatus.NOT_ENROLLED
  })
  public status: EnrollmentStatus;

  @Column({ type: DataTypes.DATE, allowNull: false })
  public enrollmentDate: Date;

  @Column({ type: DataTypes.DATE, allowNull: true })
  public dropDate: Date;

  @BelongsTo(() => Student)
  public student: Student;

  @BelongsTo(() => Course)
  public course: Course;
}