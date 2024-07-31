import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User, Course } from '.';

export enum EnrollmentStatus {
  ACTIVE = 'active',
  DROPPED = 'dropped',
  COMPLETED = 'completed',
  NOT_ENROLLED = 'not_enrolled'
}

@Table //Enrroll students
export class Enrollment extends Model<Enrollment> {
  @ForeignKey(() => User)
  @Column
  matricNo: string;

  @ForeignKey(() => Course)
  @Column
  code: string;
  // @Column({ 
  //   type: DataTypes.STRING, 
  //   allowNull: false,
  //   defaultValue: 'not_enrolled',
  //   values: ['active', 'dropped', 'completed', 'not_enrolled']
  // })
  // status: 'active'| 'dropped' | 'completed' | 'not_enrolled' ;
  @Column({
    type: DataTypes.ENUM(...Object.values(EnrollmentStatus)),
    allowNull: false,
    defaultValue: EnrollmentStatus.NOT_ENROLLED
  })
  status: EnrollmentStatus;



  @Column({ type: DataTypes.DATE, allowNull: false })
  public enrollmentDate: Date;

  @Column({ type: DataTypes.DATE, allowNull: true })
  public dropDate: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Course)
  course: Course;
}


