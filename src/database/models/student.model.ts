import { Column, PrimaryKey, Model, BelongsToMany, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { Course, Enrollment } from './';

@Table
export class Student extends Model {
  @PrimaryKey
  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
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