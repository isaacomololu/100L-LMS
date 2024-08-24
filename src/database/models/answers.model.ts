import { Table, Column, Model, ForeignKey, BelongsTo, HasMany, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Question } from './';

@Table
export class Answer extends Model<Answer> {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;

    // @Column({ type: DataTypes.STRING })
    // public matricNo: string;

    @Column({ type: DataTypes.TEXT, allowNull: false })
    public content: string;

    @Column({ type: DataTypes.DATE, allowNull: false })
    submissionDate: Date;

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

    @Column({ type: DataTypes.INTEGER })
    public score: number;

    @ForeignKey(() => Question)
    @Column
    questionId: string;

    @BelongsTo(() => Question)
    question: Question;
}