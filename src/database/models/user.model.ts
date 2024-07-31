import { Column, PrimaryKey, IsUUID, Model, BelongsToMany, Table, HasMany, Index } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { Course, Enrollment, CourseLecturer } from './';

@Table
export class User extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataTypes.STRING,
  })
  public id: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  public email: string;

  @Index //Unique Id for student
  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  public matricNo: string;

  @Column({ type: DataTypes.STRING })
  public fullName: string;

  @Column({ type: DataTypes.STRING })
  public phone: string;

  @Column({
    type: DataTypes.ENUM,
    values: ['student', 'lecturer', 'admin'],
    defaultValue: 'student',
  })
  public type: 'student' | 'lecturer' | 'admin';

  @Column({
    type: DataTypes.STRING,
    set(value: string) {
      const salt = bcrypt.genSaltSync();
      this.setDataValue('password', bcrypt.hashSync(value, salt));
    },
  })
  public password: string;

  @Column({ type: DataTypes.STRING })
  public avatar: string;

  @HasMany(() => CourseLecturer)
  courseLecturers: CourseLecturer[];

  @BelongsToMany(() => Course, () => Enrollment)//Courses a student has registerd for
  EnrolledCourses: Course[];

  @BelongsToMany(() => Course, {
    through: () => CourseLecturer,
    otherKey: 'courseCode',
    foreignKey: 'lecturerId',
    as: 'AssignedCourses'
  })//Courses lectures are assigned to
  AssignedCourses?: Course[];

  // toJSON() {
  //   const data = this.dataValues;
  //   delete data.password;
  //   delete data.totp;
  //   delete data.deletedAt;

  //   return data;
  // }

  validatePassword(val: string) {
    return bcrypt.compareSync(val, this.getDataValue('password'));
  }
}