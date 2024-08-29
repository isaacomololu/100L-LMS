import { Column, PrimaryKey, Model, BelongsToMany, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { Course, Enrollment } from './';

@Table
export class Student extends Model {
  @PrimaryKey
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isValidMatricNo(value: string) {
        const matricNoRegex = /^[A-Z]{3}\/\d{2}\/\d{4}$/;
        if (!matricNoRegex.test(value)) {
          throw new Error('Invalid matriculation number format. It should be in the format DEP/YY/NNNN (e.g., SEN/18/7839)');
        }
      }
    }
  })
  public matricNo: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  public email: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: false })
  public firstName: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: false })
  public otherName: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  public phone: string;

  @Column({
    type: DataTypes.STRING,
    set(value: string) {
      const salt = bcrypt.genSaltSync();
      this.setDataValue('password', bcrypt.hashSync(value, salt));
    },
    allowNull: false,
  })
  public password: string;

  @Column({ type: DataTypes.STRING })
  public avatar: string;

  @Column({
    type: DataTypes.STRING,
    defaultValue: Date.now(),
    allowNull: false,
  })
  public lastLoggedInAt: string;

  @BelongsToMany(() => Course, {
    through: 'Enrollment',
    foreignKey: 'matricNo',
    otherKey: 'code'
  })
  public enrolledCourses: Course[];

  validatePassword(val: string) {
    return bcrypt.compareSync(val, this.getDataValue('password'));
  }
}