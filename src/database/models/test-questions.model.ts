import { DataTypes, UUIDV4 } from 'sequelize';
import { Column, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'testQuestion', paranoid: true, timestamps: true })
export class TestQuestion extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataTypes.STRING,
  })
  public id: string;

//   @IsUUID('4')
//   @Column({
//     type: DataTypes.STRING,
//   })
//   public moduleId: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  public question: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  public type: 'mcq' | 'theory' | 'gamman';

  @Column({ type: DataTypes.JSONB })
  public options: { A: string; B: string; C: string; D: string };

  @Column({ type: DataTypes.STRING })
  public answer: 'A' | 'B' | 'C' | 'D' | string;

  @Column({ type: DataTypes.INTEGER })
  public points: number;

  @Column({ type: DataTypes.INTEGER })
  public serialNumber: number;

  toJSON() {
    const data = this.dataValues;
    delete data.deletedAt;
    return data;
  }
}
