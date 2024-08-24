import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Test, Answer, Assignment } from './';

@Table
export class Question extends Model<Question> {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    content: string;

    @Column({ type: DataTypes.STRING, allowNull: false, defaultValue: 'mcq' })
    public type: 'mcq' | 'theory';

    @Column({ type: DataTypes.JSONB })
    public options: { A: string; B: string; C: string; D: string };

    @Column({
        type: DataTypes.STRING,
        defaultValue: 'A'
    })
    public answer: 'A' | 'B' | 'C' | 'D' | string;//Is this needed when the answer model exists??

    @Column({ type: DataTypes.INTEGER })
    public points: string;

    @ForeignKey(() => Test)
    @Column
    testId: string;

    @BelongsTo(() => Test)
    test: Test;

    @ForeignKey(() => Assignment)
    @Column
    assignmentId: string;

    @BelongsTo(() => Assignment)
    assignment: Assignment;

    @HasMany(() => Answer)
    answers: Answer[];
}
