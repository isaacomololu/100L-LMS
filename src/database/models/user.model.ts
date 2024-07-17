import { Column, PrimaryKey, IsUUID, Model, BelongsToMany, Table, HasMany } from 'sequelize-typescript';
  import { DataTypes, UUIDV4 } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { Course, StudentCourses, Enrollment} from './';

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
  
  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  public matricNo: string;
  
  @Column({ type: DataTypes.STRING })
  public name: string;

  @Column({ type: DataTypes.STRING })
  public phone: string;
  
  @Column({
    type: DataTypes.STRING,
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

  // @BelongsToMany(() => Course, () => StudentCourses)
  // courses: Course[];

  @BelongsToMany(() => Course, () => Enrollment)
  courses: Course[];

  // @HasMany(() => CourseEnrollment)
  // enrollments: CourseEnrollment[];
  
  @Column({ type: DataTypes.STRING })
  public avatar: string;
  
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