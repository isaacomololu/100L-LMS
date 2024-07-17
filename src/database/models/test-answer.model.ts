import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'testAnswer', paranoid: true, timestamps: true })
export class TestAnswer extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataTypes.STRING,
  })
  public id: string;

  @IsUUID('4')
  @Column({
    type: DataTypes.STRING,
  })
  public questionId: string;

  @IsUUID('4')
  @Column({
    type: DataTypes.STRING,
  })
  public studentId: string;

  @Column({ type: DataTypes.TEXT, allowNull: false })
  public answer: string;

  @Column({ type: DataTypes.TEXT })
  public feedback: string;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  public isGraded: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  public submitted: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  public isCurrent: boolean;

  @Column({ type: DataTypes.INTEGER })
  public score: number;

  toJSON() {
    const data = this.dataValues;
    delete data.deletedAt;
    return data;
  }
}
