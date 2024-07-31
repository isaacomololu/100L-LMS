import { Column, Model, Table, DataType, ForeignKey, BelongsTo, PrimaryKey, IsUUID } from 'sequelize-typescript';
import { DataTypes, UUIDV4 } from 'sequelize';
import { Course } from './course.model';

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
        allowNull: false,
    })
    content: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date;

    @Column({
        type: DataType.ENUM('TEXT', 'VIDEO', 'PDF'),
        allowNull: false,
    })
    type: 'TEXT' | 'VIDEO';

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
    courseId: string;

    @BelongsTo(() => Course)
    course: Course;
}

//     @ForeignKey(() => Course)
//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     courseId: string;

//     @ForeignKey(() => Lecturer)
//     @Column({
//         type: DataType.STRING,
//         allowNull: false,
//     })
//     lecturerId: string;

//     @BelongsTo(() => Course)
//     course: Course;

//     @BelongsTo(() => Lecturer)
//     lecturer: Lecturer;

//     @HasMany(() => CourseMaterial)
//     materials: CourseMaterial[];
// }