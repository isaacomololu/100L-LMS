import { Column, Model, Table, DataType, ForeignKey, BelongsTo, PrimaryKey, IsUUID, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Course } from './course.model';
import { Lecturer } from './lecturer.model';

@Table
export class Lecture extends Model<Lecture> {
    @IsUUID('4')
    @PrimaryKey
    @Column({
        defaultValue: UUIDV4,
        type: DataTypes.STRING,
    })
    public id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    scheduledDate: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isCompleted: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    materialUrl: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    videoUrl: string;

    @ForeignKey(() => Course)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code: string;

    @BelongsTo(() => Course)
    course: Course;

    @ForeignKey(() => Lecturer)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lecturerId: string;

    @BelongsTo(() => Lecturer)
    lecturer: Lecturer;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

// @Column({
//     type: DataType.STRING,
//     allowNull: false,
// })
// title: string;

// @Column({
//     type: DataType.TEXT,
//     allowNull: true,
// })
// description: string;

// @Column({
//     type: DataType.DATE,
//     allowNull: true,
// })
// scheduledDate: Date;

// @Column({
//     type: DataType.BOOLEAN,
//     defaultValue: false,
// })
// isCompleted: boolean;

// @Column({
//     type: DataType.STRING,
//     allowNull: true,
// })
// materialUrl: string;

// @ForeignKey(() => Course)
// @Column({
//     type: DataType.STRING,
//     allowNull: false,
// })
// courseCode: string;

// @BelongsTo(() => Course)
// course: Course;

// @ForeignKey(() => Lecturer)
// @Column({
//     type: DataType.UUID,
//     allowNull: false,
// })
// lecturerId: string;

// @BelongsTo(() => Lecturer)
// lecturer: Lecturer;

// // You might want to add these fields as well
// @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
// })
// createdAt: Date;

// @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
// })
// updatedAt: Date;